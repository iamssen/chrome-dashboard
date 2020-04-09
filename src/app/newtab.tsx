import {
  DashboardProvider,
  filterDocsWithTags,
  filterFavoriteDocs,
  filterTasks7Days,
  filterTasksNotToday,
  filterTasksNotTomorrow,
  filterTasksToday,
  filterTasksTomorrow,
  filterUncategoriezedDocs,
  groupTasks,
  PadListDoc,
  sortDocsByRecently,
  sortFolders,
  sortTasks,
  TaskGroup,
  useDashboard,
} from '@ssen/dashboard-provider';
import { format } from 'date-fns';
import { pipe } from 'ramda';
import React from 'react';
import { render } from 'react-dom';
import { AllFolderOpenToggleButton } from './components/AllFolderOpenToggleButton';
import { BookmarkList } from './components/BookmarkList';
import { DropboxPaperFolderList } from './components/DropboxPaperFolderList';
import { Link } from './components/Link';
import { OpenNewTabButton } from './components/OpenNewTabButton';
import { AppProvider } from './context/app';

const printDoc = (docs: PadListDoc[]) => {
  return docs.map(({ title, id, url }) => (
    <li key={id}>
      <Link href={`https://paper.dropbox.com${url}`} title={title} />
    </li>
  ));
};

const printTaskGroup = (tasks: TaskGroup[]) => {
  return tasks.map(({ padUrl, title, children }) => (
    <li key={padUrl}>
      {title}
      <ul>
        {children.map(({ usuallyUniqueId, padUrl, textline, dueDate, encryptedId }) => (
          <li key={encryptedId}>
            <Link
              href={`${padUrl}#:hluuid=${usuallyUniqueId}`}
              title={`${dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : ''} ${textline}`}
            />
          </li>
        ))}
      </ul>
    </li>
  ));
};

const printTopSite = (topSites: chrome.topSites.MostVisitedURL[]) => {
  return topSites.map(({ title, url }) => (
    <li key={url}>
      <Link href={url} title={title} />
    </li>
  ));
};

function Layout() {
  const {
    storageData: { dropboxPaper },
    bookmarks,
    apps,
    topSites,
  } = useDashboard();

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <ul>
          <li>
            <AllFolderOpenToggleButton />
            <OpenNewTabButton />
          </li>
          <li>
            <h3>top sites ({topSites.length})</h3>
          </li>
          {pipe(
            printTopSite, // print
          )(topSites)}

          <li>
            <h3>bookmarks ({bookmarks.length})</h3>
          </li>
          <BookmarkList bookmarks={bookmarks} />

          <li>
            <h3>apps ({apps.length})</h3>
          </li>
          {apps.map(({ shortName, id }) => (
            <li key={id}>{shortName}</li>
          ))}

          <li>
            <h3>favorite</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterFavoriteDocs, // filter
              printDoc, // print
            )(dropboxPaper.docs)}
        </ul>
        <ul>
          <li>
            <h3>active</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterDocsWithTags('a', 'active'), // filter
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>routine</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterDocsWithTags('r', 'routine'), // filter
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>inbox</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterDocsWithTags('i', 'inbox'), // filter
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>next</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterDocsWithTags('n', 'next'), // filter
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>someday</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterDocsWithTags('s', 'someday'), // filter
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>recently docs</h3>
          </li>
          {dropboxPaper &&
            pipe(
              sortDocsByRecently, // sort
              (docs) => docs.slice(0, 20), // slice
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>uncategoriezed</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterUncategoriezedDocs, // filter
              printDoc, // print
            )(dropboxPaper.docs)}
          <li>
            <h3>folders</h3>
          </li>
          {dropboxPaper && <DropboxPaperFolderList folders={sortFolders(dropboxPaper.folders)} />}
          <li>
            <h3>docs ({dropboxPaper?.docs.length})</h3>
          </li>
          {dropboxPaper &&
            pipe(
              printDoc, // print
            )(dropboxPaper.docs)}
        </ul>
        <ul>
          <li>
            <h3>today</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterTasksToday, // filter
              sortTasks, // sort
              groupTasks, // group
              printTaskGroup, // print
            )(dropboxPaper.tasks)}
          <li>
            <h3>tomorrow</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterTasksTomorrow, // filter
              filterTasksNotToday,
              sortTasks, // sort
              groupTasks, // group
              printTaskGroup, // print
            )(dropboxPaper.tasks)}
          <li>
            <h3>week</h3>
          </li>
          {dropboxPaper &&
            pipe(
              filterTasks7Days, // filter
              filterTasksNotToday,
              filterTasksNotTomorrow,
              sortTasks, // sort
              groupTasks, // group
              printTaskGroup, // print
            )(dropboxPaper.tasks)}
          <li>
            <h3>tasks ({dropboxPaper?.tasks.length})</h3>
          </li>
          {/*https://paper.dropbox.com/doc/iSUuw3g4D37WcTcEqJMp4#:hluuid=206582632020440577868479*/}
          {dropboxPaper &&
            pipe(
              sortTasks, // sort
              groupTasks, // group
              printTaskGroup, // print
            )(dropboxPaper.tasks)}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <AppProvider>
        <Layout />
      </AppProvider>
    </DashboardProvider>
  );
}

render(<App />, document.querySelector('#app'));

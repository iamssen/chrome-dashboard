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
  sortDocsByRecently,
  sortFolders,
  sortTasks,
  useDashboard,
} from '@ssen/dashboard-provider';
import { pipe } from 'ramda';
import React from 'react';
import { render } from 'react-dom';
import { ContentBody } from './components/layout/ContentBody';
import { GlobalStyle } from './components/layout/GlobalStyle';
import { FocusSection, ImportantSection, Section } from './components/layout/Section';
import { SideBar } from './components/layout/SideBar';
import { AllFolderOpenToggleButton } from './components/primitives/AllFolderOpenToggleButton';
import { BookmarkList } from './components/primitives/BookmarkList';
import { ChromeApps } from './components/primitives/ChromeApps';
import { DropboxPaperFolderList } from './components/primitives/DropboxPaperFolderList';
import { OpenNewTabButton } from './components/primitives/OpenNewTabButton';
import { printDoc } from './components/primitives/printDoc';
import { printTaskGroup } from './components/primitives/printTaskGroup';
import { printTopSite } from './components/primitives/printTopSite';
import { AppProvider } from './context/app';

function Layout() {
  const {
    storageData: { dropboxPaper },
    bookmarks,
    apps,
    topSites,
  } = useDashboard();

  return (
    <>
      <SideBar>
        <ChromeApps apps={apps} />

        <ul>
          <li>
            <AllFolderOpenToggleButton />
          </li>
          <li>
            <OpenNewTabButton />
          </li>
        </ul>
      </SideBar>

      <ContentBody>
        <div>
          <Section>
            <h3>
              top sites <sub>{topSites.length}</sub>
            </h3>
            <ul>
              {pipe(
                printTopSite, // print
              )(topSites)}
            </ul>
          </Section>

          <Section>
            <h3>favorite</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterFavoriteDocs, // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </Section>

          <Section>
            <h3>
              bookmarks <sub>{bookmarks.length}</sub>
            </h3>
            <BookmarkList bookmarks={bookmarks} />
          </Section>
        </div>

        <div>
          <ImportantSection>
            <h3>active</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterDocsWithTags('a', 'active'), // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </ImportantSection>
          <FocusSection>
            <h3>routine</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterDocsWithTags('r', 'routine'), // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </FocusSection>
          <FocusSection>
            <h3>inbox</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterDocsWithTags('i', 'inbox'), // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </FocusSection>
          <Section>
            <h3>next</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterDocsWithTags('n', 'next'), // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </Section>
          <Section>
            <h3>someday</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterDocsWithTags('s', 'someday'), // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </Section>
          <Section>
            <h3>recently docs</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  sortDocsByRecently, // sort
                  (docs) => docs.slice(0, 20), // slice
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </Section>
          <Section>
            <h3>uncategoriezed</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterUncategoriezedDocs, // filter
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </Section>
          <Section>
            <h3>folders</h3>
            {dropboxPaper && <DropboxPaperFolderList folders={sortFolders(dropboxPaper.folders)} />}
          </Section>
          <Section>
            <h3>
              docs <sub>{dropboxPaper?.docs.length}</sub>
            </h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  printDoc, // print
                )(dropboxPaper.docs)}
            </ul>
          </Section>
        </div>

        <div>
          <ImportantSection>
            <h3>today</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterTasksToday, // filter
                  sortTasks, // sort
                  groupTasks, // group
                  printTaskGroup({ printDate: false }), // print
                )(dropboxPaper.tasks)}
            </ul>
          </ImportantSection>
          <FocusSection>
            <h3>tomorrow</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterTasksTomorrow, // filter
                  filterTasksNotToday,
                  sortTasks, // sort
                  groupTasks, // group
                  printTaskGroup({ printDate: false }), // print
                )(dropboxPaper.tasks)}
            </ul>
          </FocusSection>
          <Section>
            <h3>week</h3>
            <ul>
              {dropboxPaper &&
                pipe(
                  filterTasks7Days, // filter
                  filterTasksNotToday,
                  filterTasksNotTomorrow,
                  sortTasks, // sort
                  groupTasks, // group
                  printTaskGroup(), // print
                )(dropboxPaper.tasks)}
            </ul>
          </Section>
          <Section>
            <h3>
              tasks <sub>{dropboxPaper?.tasks.length}</sub>
            </h3>
            <ul>
              {/*https://paper.dropbox.com/doc/iSUuw3g4D37WcTcEqJMp4#:hluuid=206582632020440577868479*/}
              {dropboxPaper &&
                pipe(
                  sortTasks, // sort
                  groupTasks, // group
                  printTaskGroup(), // print
                )(dropboxPaper.tasks)}
            </ul>
          </Section>
        </div>
      </ContentBody>
    </>
  );
}

function App() {
  return (
    <DashboardProvider>
      <AppProvider>
        <GlobalStyle />
        <Layout />
      </AppProvider>
    </DashboardProvider>
  );
}

render(<App />, document.querySelector('#app'));

import {
  DashboardProvider,
  filterDocsWithTags,
  filterFavoriteDocs,
  filterTasks7Days,
  filterTasksNotToday,
  filterTasksToday,
  filterUncategoriezedDocs,
  groupTasks,
  sortTasks,
  useDashboard,
  sortFolders,
} from '@ssen/dashboard-provider';
import { format } from 'date-fns';
import { pipe } from 'ramda';
import React from 'react';
import { render } from 'react-dom';
import { DropboxPaperFolderList } from './components/DropboxPaperFolderList';
import { Title } from './components/Title';

function Layout() {
  const {
    storageData: { dropboxPaper },
    bookmarks,
    apps,
    topSites,
  } = useDashboard();

  return (
    <div>
      <Title text="Hello NewTab ???? $$$$" />
      <div style={{ display: 'flex' }}>
        <div>{dropboxPaper && <DropboxPaperFolderList folders={sortFolders(dropboxPaper.folders)} />}</div>
        <ul>
          <li>bookmarks ({bookmarks.length})</li>
          {bookmarks.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <ul>
          <li>apps ({apps.length})</li>
          {apps.map(({ shortName, id }) => (
            <li key={id}>{shortName}</li>
          ))}
        </ul>
        <ul>
          <li>top sites ({topSites.length})</li>
          {topSites.map(({ title, url }) => (
            <li key={url}>{title}</li>
          ))}
        </ul>
        <ul>
          <li>
            <h3>favorite</h3>
          </li>
          {dropboxPaper &&
            pipe(filterFavoriteDocs, docs => docs.map(({ title, id }) => <li key={id}>{title}</li>))(dropboxPaper.docs)}
          <li>
            <h3>routine</h3>
          </li>
          {dropboxPaper &&
            pipe(filterDocsWithTags('r', 'routine'), docs => docs.map(({ title, id }) => <li key={id}>{title}</li>))(
              dropboxPaper.docs,
            )}
          <li>
            <h3>inbox</h3>
          </li>
          {dropboxPaper &&
            pipe(filterDocsWithTags('i', 'inbox'), docs => docs.map(({ title, id }) => <li key={id}>{title}</li>))(
              dropboxPaper.docs,
            )}
          <li>
            <h3>next</h3>
          </li>
          {dropboxPaper &&
            pipe(filterDocsWithTags('n', 'next'), docs => docs.map(({ title, id }) => <li key={id}>{title}</li>))(
              dropboxPaper.docs,
            )}
          <li>
            <h3>someday</h3>
          </li>
          {dropboxPaper &&
            pipe(filterDocsWithTags('s', 'someday'), docs => docs.map(({ title, id }) => <li key={id}>{title}</li>))(
              dropboxPaper.docs,
            )}
          <li>
            <h3>uncategoriezed</h3>
          </li>
          {dropboxPaper &&
            pipe(filterUncategoriezedDocs, docs => docs.map(({ title, id }) => <li key={id}>{title}</li>))(
              dropboxPaper.docs,
            )}
          <li>
            <h3>docs ({dropboxPaper?.docs.length})</h3>
          </li>
          {dropboxPaper?.docs.map(({ title, id }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
        <ul>
          <li>
            <h3>today</h3>
          </li>
          {dropboxPaper &&
            pipe(filterTasksToday, sortTasks, groupTasks, tasks =>
              tasks.map(({ padUrl, title, children }) => (
                <li key={padUrl}>
                  {title}
                  <ul>
                    {children.map(({ usuallyUniqueId, padUrl, textline, dueDate, encryptedId }) => (
                      <li key={encryptedId}>
                        <a href={`${padUrl}#:hluuid=${usuallyUniqueId}`}>
                          {dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : ''} {textline}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )),
            )(dropboxPaper.tasks)}
          <li>
            <h3>week</h3>
          </li>
          {dropboxPaper &&
            pipe(filterTasks7Days, filterTasksNotToday, sortTasks, groupTasks, tasks =>
              tasks.map(({ padUrl, title, children }) => (
                <li key={padUrl}>
                  {title}
                  <ul>
                    {children.map(({ usuallyUniqueId, padUrl, textline, dueDate, encryptedId }) => (
                      <li key={encryptedId}>
                        <a href={`${padUrl}#:hluuid=${usuallyUniqueId}`}>
                          {dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : ''} {textline}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )),
            )(dropboxPaper.tasks)}
          <li>
            <h3>tasks ({dropboxPaper?.tasks.length})</h3>
          </li>
          {/*https://paper.dropbox.com/doc/iSUuw3g4D37WcTcEqJMp4#:hluuid=206582632020440577868479*/}
          {dropboxPaper &&
            pipe(sortTasks, groupTasks, tasks =>
              tasks.map(({ padUrl, title, children }) => (
                <li key={padUrl}>
                  {title}
                  <ul>
                    {children.map(({ usuallyUniqueId, padUrl, textline, dueDate, encryptedId }) => (
                      <li key={encryptedId}>
                        <a href={`${padUrl}#:hluuid=${usuallyUniqueId}`}>
                          {dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : ''} {textline}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )),
            )(dropboxPaper.tasks)}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <Layout />
    </DashboardProvider>
  );
}

render(<App />, document.querySelector('#app'));

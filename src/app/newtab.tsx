import React from 'react';
import { render } from 'react-dom';
import { Title } from './components/Title';
import { AppProvider, useApp } from './context/app';

function Layout() {
  const {storageData: {dropboxPaper}, bookmarks, apps, topSites} = useApp();
  
  return (
    <div>
      <Title text="Hello NewTab ???? $$$$"/>
      <div style={{display: 'flex'}}>
        <ul>
          <li>folders ({dropboxPaper?.folders.length})</li>
          {
            dropboxPaper?.folders.map(({name, id: folderId, docs}) => (
              <li key={folderId}>
                {name}
                {
                  docs.length > 0 &&
                  <ul>
                    {
                      docs.map(({title, id: docId}) => (
                        <li key={folderId + docId}>
                          {title}
                        </li>
                      ))
                    }
                  </ul>
                }
              </li>
            ))
          }
        </ul>
        <ul>
          <li>bookmarks ({bookmarks.length})</li>
          {
            bookmarks.map(({title, id}) => (
              <li key={id}>
                {title}
              </li>
            ))
          }
        </ul>
        <ul>
          <li>apps ({apps.length})</li>
          {
            apps.map(({shortName, id}) => (
              <li key={id}>
                {shortName}
              </li>
            ))
          }
        </ul>
        <ul>
          <li>top sites ({topSites.length})</li>
          {
            topSites.map(({title, url}) => (
              <li key={url}>
                {title}
              </li>
            ))
          }
        </ul>
        <ul>
          <li>docs ({dropboxPaper?.docs.length})</li>
          {
            dropboxPaper?.docs.map(({title, id}) => (
              <li key={id}>
                {title}
              </li>
            ))
          }
        </ul>
        <ul>
          <li>tasks ({dropboxPaper?.tasks.length})</li>
          {/*https://paper.dropbox.com/doc/iSUuw3g4D37WcTcEqJMp4#:hluuid=206582632020440577868479*/}
          {
            dropboxPaper?.tasks
              .sort((a, b) => {
                return (b.dueDate ? new Date(b.dueDate).getTime() : 0) - (a.dueDate ? new Date(a.dueDate).getTime() : 0);
              })
              .map(({usuallyUniqueId, title, padUrl, textline, dueDate, encryptedId}) => (
                <li key={encryptedId}>
                  <a href={`${padUrl}#:hluuid=${usuallyUniqueId}`}>
                    {textline} ({title} / {dueDate})
                  </a>
                </li>
              ))
          }
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Layout/>
    </AppProvider>
  );
}

render(<App/>, document.querySelector('#app'));
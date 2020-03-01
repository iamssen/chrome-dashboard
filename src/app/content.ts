import { stateObserver } from '@ssen/state-observer';
import { getDropboxPaper } from './services/getDropboxPaper';
import { setStorageData } from './services/setStorageData';

stateObserver({ getState: getDropboxPaper }).subscribe(dropboxPaper => {
  console.log('CAPTURE DATA:', dropboxPaper);
  setStorageData({
    dropboxPaper,
  });
});

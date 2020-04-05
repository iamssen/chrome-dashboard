import { getDropboxPaper, setStorageData } from '@ssen/dashboard-provider';
import { stateObserver } from '@ssen/state-observer';

stateObserver({ getState: getDropboxPaper }).subscribe((dropboxPaper) => {
  console.log('CAPTURE DATA:', dropboxPaper);
  setStorageData({
    dropboxPaper,
  });
});

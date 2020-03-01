import { services } from '@ssen/dashboard-provider';
import { stateObserver } from '@ssen/state-observer';

stateObserver({ getState: services.getDropboxPaper }).subscribe(dropboxPaper => {
  console.log('CAPTURE DATA:', dropboxPaper);
  services.setStorageData({
    dropboxPaper,
  });
});

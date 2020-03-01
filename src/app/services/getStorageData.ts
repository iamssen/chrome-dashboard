import { StorageData } from '../model/storage';

export async function getStorageData(): Promise<StorageData> {
  return new Promise<StorageData>(resolve => {
    chrome.storage.local.get(storageData => {
      resolve(storageData);
    });
  });
}

import { StorageData } from '../model/storage';

export async function setStorageData(patch: Partial<StorageData>) {
  chrome.storage.local.set(patch);
}

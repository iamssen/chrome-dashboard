export async function getApps(): Promise<chrome.management.ExtensionInfo[]> {
  return new Promise(resolve => {
    chrome.management.getAll(extensions => {
      resolve(extensions.filter(({ enabled, type }) => enabled && type.lastIndexOf('app') > -1));
    });
  });
}

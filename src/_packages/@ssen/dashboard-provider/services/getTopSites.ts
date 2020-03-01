export async function getTopSites(): Promise<chrome.topSites.MostVisitedURL[]> {
  return new Promise(resolve => {
    chrome.topSites.get(topSites => {
      resolve(topSites);
    });
  });
}

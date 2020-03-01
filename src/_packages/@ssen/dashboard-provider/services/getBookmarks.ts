export async function getBookmarks(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise(resolve => {
    chrome.bookmarks.getSubTree('1', ([bookmarks]) => {
      resolve(bookmarks.children || []);
    });
  });
}

import { hasTag } from './title';

export interface BookmarkTreeNode {
  id: string;
  source: chrome.bookmarks.BookmarkTreeNode & { isFavorite: boolean };
  children?: BookmarkTreeNode[];
}

export function hierarchyBookmarks(bookmarks: chrome.bookmarks.BookmarkTreeNode[]): BookmarkTreeNode[] {
  function loop(children: chrome.bookmarks.BookmarkTreeNode[]): BookmarkTreeNode[] {
    return children.map((child) => {
      return {
        id: child.id,
        source: { ...child, isFavorite: hasTag('f', 'favorite')(child.title) },
        children: child.children && child.children.length > 0 ? loop(child.children) : undefined,
      };
    });
  }

  return loop(bookmarks);
}

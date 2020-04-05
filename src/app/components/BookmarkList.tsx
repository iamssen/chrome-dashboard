import { BookmarkTreeNode, hierarchyBookmarks } from '@ssen/dashboard-provider';
import { someHierarchy } from '@ssen/hierarchy';
import { HierarchyList, MemoryOpenProvider, OpenProvider } from '@ssen/hierarchy-list';
import React, { ReactNode, useMemo } from 'react';
import { useApp } from '../context/app';
import { Link } from './Link';

function initialOpen({ source: { isFavorite }, children }: BookmarkTreeNode): boolean {
  if (isFavorite) return true;
  if (!children) return false;
  return someHierarchy({
    data: children,
    children: 'children',
    some: ({ source }) => source.isFavorite,
  });
}

function titleRenderer({ source: { title, url, isFavorite } }: BookmarkTreeNode): ReactNode {
  return (
    <>
      {isFavorite && '⭐️'}
      <Link href={url || ''} title={title} />
    </>
  );
}

function dataAttribute({ source: { title, isFavorite } }: BookmarkTreeNode) {
  return {
    'data-title': title,
    'data-favorite': isFavorite.toString(),
  };
}

function openRenderer(open: boolean, onToggle: () => void): ReactNode {
  return <button onClick={onToggle}>{open ? '[+]' : '[-]'}</button>;
}

export function BookmarkList({ bookmarks }: { bookmarks: chrome.bookmarks.BookmarkTreeNode[] }) {
  const data = hierarchyBookmarks(bookmarks);

  const openProvider = useMemo<OpenProvider>(() => {
    return new MemoryOpenProvider();
  }, []);

  const { allFolderOpen } = useApp();

  return (
    <HierarchyList
      data={data}
      openProvider={openProvider}
      openRenderer={openRenderer}
      titleRenderer={titleRenderer}
      dataAttribute={dataAttribute}
      initialOpen={initialOpen}
      allFolderOpen={allFolderOpen}
    />
  );
}

import { BookmarkTreeNode, hierarchyBookmarks } from '@ssen/dashboard-provider';
import { someHierarchy } from '@ssen/hierarchy';
import { HierarchyList } from '@ssen/hierarchy-list';
import React, { ReactNode } from 'react';
import { useApp } from '../../context/app';
import { useHierarchyListOpenProvider } from '../../services/useHierarchyListOpenProvider';
import { Link } from './Link';
import { Bookmark as Favorite, ExpandMore as FolderClose, ExpandLess as FolderOpen } from '@material-ui/icons';
import { CleanButton } from '../layout/CleanButton';

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
      {isFavorite && <Favorite style={{ marginRight: 5 }} />}
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

const openRenderer = (allFolderOpen: boolean) => (open: boolean, onToggle: () => void): ReactNode => {
  return allFolderOpen ? null : (
    <CleanButton onClick={onToggle}>
      {open ? <FolderOpen style={{ marginRight: 5 }} /> : <FolderClose style={{ marginRight: 5 }} />}
    </CleanButton>
  );
};

export function BookmarkList({ bookmarks }: { bookmarks: chrome.bookmarks.BookmarkTreeNode[] }) {
  const data = hierarchyBookmarks(bookmarks);

  const openProvider = useHierarchyListOpenProvider('bookmark-list');

  const { allFolderOpen } = useApp();

  return (
    <HierarchyList
      data={data}
      openProvider={openProvider}
      openRenderer={openRenderer(allFolderOpen)}
      titleRenderer={titleRenderer}
      dataAttribute={dataAttribute}
      initialOpen={initialOpen}
      allFolderOpen={allFolderOpen}
    />
  );
}

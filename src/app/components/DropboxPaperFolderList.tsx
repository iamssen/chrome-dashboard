import { DropboxPaperFolder, hierarchyFolders, PadListFolder } from '@ssen/dashboard-provider';
import { someHierarchy } from '@ssen/hierarchy';
import { HierarchyList, MemoryOpenProvider, OpenProvider } from '@ssen/hierarchy-list';
import React, { ReactNode, useMemo } from 'react';
import { useApp } from '../context/app';
import { Link } from './Link';

function initialOpen({ source: { isFavorite }, children }: DropboxPaperFolder): boolean {
  if (isFavorite) return true;
  if (!children) return false;
  return someHierarchy({
    data: children,
    children: 'children',
    some: ({ source }) => source.isFavorite,
  });
}

function titleRenderer({ source: { id, name, isFavorite } }: DropboxPaperFolder): ReactNode {
  return (
    <>
      {isFavorite && '⭐️'}
      <Link href={`https://paper.dropbox.com/folder/show/${id}`} title={name} />
    </>
  );
}

function dateAttribute({ source: { name, isFavorite } }: DropboxPaperFolder) {
  return {
    'data-title': name,
    'data-favorite': isFavorite.toString(),
  };
}

function openRenderer(open: boolean, onToggle: () => void): ReactNode {
  return <button onClick={onToggle}>{open ? '[+]' : '[-]'}</button>;
}

export function DropboxPaperFolderList({ folders }: { folders: PadListFolder[] }) {
  const data = hierarchyFolders(folders);

  const openProvider = useMemo<OpenProvider>(() => {
    return new MemoryOpenProvider();
  }, []);

  const { allFolderOpen } = useApp();

  return (
    <HierarchyList
      data={data}
      openProvider={openProvider}
      allFolderOpen={allFolderOpen}
      initialOpen={initialOpen}
      titleRenderer={titleRenderer}
      dataAttribute={dateAttribute}
      openRenderer={openRenderer}
    />
  );
}

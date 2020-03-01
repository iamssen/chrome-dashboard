import { DropboxPaperFolder, hierarchyFolders } from '@ssen/dashboard-provider';
import { PadListFolder } from '@ssen/dashboard-provider/services/dropbox-paper';
import { someHierarchy } from '@ssen/hierarchy';
import { HierarchyList, MemoryOpenProvider, OpenProvider } from '@ssen/hierarchy-list';
import React, { ReactNode, useMemo, useState } from 'react';

function initialOpen({ source: { isFavorite }, children }: DropboxPaperFolder): boolean {
  if (isFavorite) return true;
  if (!children) return false;
  return someHierarchy({
    data: children,
    children: 'children',
    some: ({ source }) => source.isFavorite,
  });
}

function titleRenderer({ source: { name, isFavorite } }: DropboxPaperFolder): ReactNode {
  return (
    <>
      {isFavorite && '⭐️'}
      {name}
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

  const [allFolderOpen, setAllFolderOpen] = useState<boolean>(true);

  return (
    <div>
      <HierarchyList
        data={data}
        openProvider={openProvider}
        allFolderOpen={allFolderOpen}
        initialOpen={initialOpen}
        titleRenderer={titleRenderer}
        dataAttribute={dateAttribute}
        openRenderer={openRenderer}
      />
      <div>
        <button onClick={() => setAllFolderOpen(!allFolderOpen)}>all folder open: {allFolderOpen}</button>
      </div>
    </div>
  );
}

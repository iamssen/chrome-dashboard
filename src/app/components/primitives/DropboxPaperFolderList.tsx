import { ExpandLess as FolderOpen, ExpandMore as FolderClose, StarBorder as Favorite } from '@material-ui/icons';
import { DropboxPaperFolder, hierarchyFolders, PadListFolder } from '@ssen/dashboard-provider';
import { someHierarchy } from '@ssen/hierarchy';
import { HierarchyList } from '@ssen/hierarchy-list';
import React, { ReactNode } from 'react';
import { useApp } from '../../context/app';
import { useHierarchyListOpenProvider } from '../../services/useHierarchyListOpenProvider';
import { CleanButton } from '../layout/CleanButton';
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
      {isFavorite && <Favorite style={{ marginRight: 5 }} />}
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

const openRenderer = (allFolderOpen: boolean) => (open: boolean, onToggle: () => void): ReactNode => {
  return allFolderOpen ? null : (
    <CleanButton onClick={onToggle}>
      {open ? <FolderOpen style={{ marginRight: 5 }} /> : <FolderClose style={{ marginRight: 5 }} />}
    </CleanButton>
  );
};

export function DropboxPaperFolderList({ folders }: { folders: PadListFolder[] }) {
  const data = hierarchyFolders(folders);

  const openProvider = useHierarchyListOpenProvider('dropbox-paper-folder-list');

  const { allFolderOpen } = useApp();

  return (
    <HierarchyList
      data={data}
      openProvider={openProvider}
      allFolderOpen={allFolderOpen}
      initialOpen={initialOpen}
      titleRenderer={titleRenderer}
      dataAttribute={dateAttribute}
      openRenderer={openRenderer(allFolderOpen)}
    />
  );
}

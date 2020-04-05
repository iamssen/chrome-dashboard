import React from 'react';
import { useApp } from '../context/app';

export function AllFolderOpenToggleButton() {
  const { allFolderOpen, updateAllFolderOpen } = useApp();

  return (
    <button onClick={() => updateAllFolderOpen(!allFolderOpen)}>all folder open: {allFolderOpen.toString()}</button>
  );
}

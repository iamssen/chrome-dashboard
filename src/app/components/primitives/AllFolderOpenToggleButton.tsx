import { UnfoldLess, UnfoldMore } from '@material-ui/icons';
import React from 'react';
import { useApp } from '../../context/app';
import { IconButton, Tooltip } from '@material-ui/core';

export function AllFolderOpenToggleButton() {
  const { allFolderOpen, updateAllFolderOpen } = useApp();

  return (
    <Tooltip title={`Force open directories : ${allFolderOpen ? 'on' : 'off'}`} placement="right">
      <IconButton onClick={() => updateAllFolderOpen(!allFolderOpen)}>
        {allFolderOpen ? <UnfoldMore /> : <UnfoldLess />}
      </IconButton>
    </Tooltip>
  );
}

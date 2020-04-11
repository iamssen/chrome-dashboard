import { IconButton, Tooltip } from '@material-ui/core';
import { OpenInBrowser, WebAsset } from '@material-ui/icons';
import React from 'react';
import { useApp } from '../../context/app';

export function OpenNewTabButton() {
  const { openNewTab, updateOpenNewTab } = useApp();

  return (
    <Tooltip title={`Open links to new tab : ${openNewTab ? 'on' : 'off'}`} placement="right">
      <IconButton onClick={() => updateOpenNewTab(!openNewTab)}>
        {openNewTab ? <OpenInBrowser /> : <WebAsset />}
      </IconButton>
    </Tooltip>
  );
}

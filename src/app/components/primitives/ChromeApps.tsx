import { Tooltip, IconButton } from '@material-ui/core';
import { Extension } from '@material-ui/icons';
import React, { useCallback } from 'react';

export interface ChromeAppsProps {
  apps: chrome.management.ExtensionInfo[];
}

export function ChromeApps({ apps }: ChromeAppsProps) {
  const launch = useCallback((app: chrome.management.ExtensionInfo) => {
    chrome.management.launchApp(app.id);
    window.close();
  }, []);

  return (
    <ul>
      {apps.map((app) => (
        <li key={app.id}>
          <Tooltip title={app.shortName} placement="right">
            <IconButton onClick={() => launch(app)}>
              {app.icons && app.icons.length > 0 ? (
                <img src={app.icons.sort((a, b) => (a.size > b.size ? -1 : 1))[0].url} alt={app.shortName} />
              ) : (
                <Extension />
              )}
            </IconButton>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}

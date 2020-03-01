import { useStateObserver } from '@ssen/state-observer';
import React, { Consumer, Context, createContext, ReactNode, useContext } from 'react';
import { StorageData } from '../model/storage';
import { getApps } from '../services/getApps';
import { getBookmarks } from '../services/getBookmarks';
import { getStorageData } from '../services/getStorageData';
import { getTopSites } from '../services/getTopSites';

export interface AppProviderProps {
  children: ReactNode;
}

export interface AppState {
  storageData: StorageData;
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  topSites: chrome.topSites.MostVisitedURL[];
  apps: chrome.management.ExtensionInfo[];
}

// @ts-ignore
const AppContext: Context<AppState> = createContext<AppState>();

export function AppProvider({ children }: AppProviderProps) {
  const storageData: StorageData = useStateObserver({ getState: getStorageData, initialState: {} });
  const bookmarks: chrome.bookmarks.BookmarkTreeNode[] = useStateObserver({ getState: getBookmarks, initialState: [] });
  const topSites: chrome.topSites.MostVisitedURL[] = useStateObserver({ getState: getTopSites, initialState: [] });
  const apps: chrome.management.ExtensionInfo[] = useStateObserver({ getState: getApps, initialState: [] });

  return (
    <AppContext.Provider
      value={{
        storageData: storageData || {},
        bookmarks: bookmarks || [],
        topSites: topSites || [],
        apps: apps || [],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppState {
  return useContext(AppContext);
}

export const AppConsumer: Consumer<AppState> = AppContext.Consumer;

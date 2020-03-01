import { useStateObserver } from '@ssen/state-observer';
import React, { Consumer, Context, createContext, ReactNode, useContext } from 'react';
import { StorageData } from '../model/storage';
import { getApps } from '../services/getApps';
import { getBookmarks } from '../services/getBookmarks';
import { getStorageData } from '../services/getStorageData';
import { getTopSites } from '../services/getTopSites';

export interface DashboardProviderProps {
  children: ReactNode;
}

export interface DashboardState {
  storageData: StorageData;
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
  topSites: chrome.topSites.MostVisitedURL[];
  apps: chrome.management.ExtensionInfo[];
}

// @ts-ignore
const DashboardContext: Context<DashboardState> = createContext<DashboardState>();

export function DashboardProvider({ children }: DashboardProviderProps) {
  const storageData: StorageData = useStateObserver({ getState: getStorageData, initialState: {} });
  const bookmarks: chrome.bookmarks.BookmarkTreeNode[] = useStateObserver({ getState: getBookmarks, initialState: [] });
  const topSites: chrome.topSites.MostVisitedURL[] = useStateObserver({ getState: getTopSites, initialState: [] });
  const apps: chrome.management.ExtensionInfo[] = useStateObserver({ getState: getApps, initialState: [] });

  return (
    <DashboardContext.Provider
      value={{
        storageData: storageData || {},
        bookmarks: bookmarks || [],
        topSites: topSites || [],
        apps: apps || [],
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardState {
  return useContext(DashboardContext);
}

export const DashboardConsumer: Consumer<DashboardState> = DashboardContext.Consumer;

import React, { Consumer, Context, createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface AppProviderProps {
  children: ReactNode;
}

export interface AppState {
  allFolderOpen: boolean;
  openNewTab: boolean;

  updateAllFolderOpen: (nextAllFolderOpen: boolean) => void;
  updateOpenNewTab: (nextOpenNewTab: boolean) => void;
}

// @ts-ignore
const AppContext: Context<AppState> = createContext<AppState>();

export function AppProvider({ children }: AppProviderProps) {
  const [allFolderOpen, setAllFolderOpen] = useState<boolean>(() => false);
  const [openNewTab, setOpenNewTab] = useState<boolean>(() => false);

  const state = useMemo<AppState>(() => {
    return {
      allFolderOpen,
      openNewTab,
      updateAllFolderOpen: setAllFolderOpen,
      updateOpenNewTab: setOpenNewTab,
    };
  }, [allFolderOpen, openNewTab]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  return useContext(AppContext);
}

export const AppConsumer: Consumer<AppState> = AppContext.Consumer;

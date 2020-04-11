import { useLocalStorage } from '@ssen/use-local-storage';
import React, { Consumer, Context, createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { Config } from '../model/config';

export interface AppProviderProps {
  children: ReactNode;
}

export interface AppState extends Config {
  updateAllFolderOpen: (nextAllFolderOpen: boolean) => void;
  updateOpenNewTab: (nextOpenNewTab: boolean) => void;
}

// @ts-ignore
const AppContext: Context<AppState> = createContext<AppState>();

export function AppProvider({ children }: AppProviderProps) {
  const [config, updateConfig] = useLocalStorage<Config>({
    id: 'app-configs',
    defaultValue: () => ({
      allFolderOpen: false,
      openNewTab: false,
    }),
    interval: 1000,
  });

  const updateAllFolderOpen = useCallback(
    (nextAllFolderOpen: boolean) => {
      updateConfig({
        allFolderOpen: nextAllFolderOpen,
      });
    },
    [updateConfig],
  );

  const updateOpenNewTab = useCallback(
    (nextOpenNewTab: boolean) => {
      updateConfig({
        openNewTab: nextOpenNewTab,
      });
    },
    [updateConfig],
  );

  const state = useMemo<AppState>(() => {
    return {
      ...config,
      updateAllFolderOpen,
      updateOpenNewTab,
    };
  }, [config, updateAllFolderOpen, updateOpenNewTab]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  return useContext(AppContext);
}

export const AppConsumer: Consumer<AppState> = AppContext.Consumer;

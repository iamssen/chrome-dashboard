import React, { Consumer, Context, createContext, ReactNode, useContext } from 'react';
import { HierarchyListConfig } from '../types';

export interface HierarchyProviderProps extends HierarchyListConfig {
  children: ReactNode;
}

export interface HierarchyState extends HierarchyListConfig {}

// @ts-ignore
const HierarchyContext: Context<HierarchyState> = createContext<HierarchyState>();

export function HierarchyProvider({ children, ...config }: HierarchyProviderProps) {
  return (
    <HierarchyContext.Provider
      value={{
        ...config,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
}

export function useHierarchy(): HierarchyState {
  return useContext(HierarchyContext);
}

export const HierarchyConsumer: Consumer<HierarchyState> = HierarchyContext.Consumer;

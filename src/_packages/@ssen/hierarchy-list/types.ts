import { ReactNode } from 'react';
import { OpenProvider } from './providers/OpenProvider';

export interface TreeNode<T = {}> {
  id: string;
  source: T;
  children?: TreeNode<T>[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HierarchyListConfig {
  openProvider: OpenProvider;
  openRenderer: (open: boolean, onToggle: () => void) => ReactNode;
  titleRenderer: (node: TreeNode<any>) => ReactNode;
  dataAttribute: (node: TreeNode<any>) => { [key: string]: string };
  initialOpen: (node: TreeNode<any>) => boolean;
  allFolderOpen: boolean;
}

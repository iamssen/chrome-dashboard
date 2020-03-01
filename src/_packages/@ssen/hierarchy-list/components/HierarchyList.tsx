import React, { ComponentType } from 'react';
import styled from 'styled-components';
import { HierarchyProvider } from '../context/hierarchy';
import { HierarchyListConfig, TreeNode } from '../types';
import { Children } from './Children';

export interface HierarchyListProps extends HierarchyListConfig {
  data: TreeNode[];
  className?: string;
}

function HierarchyListBase({ data, className, ...config }: HierarchyListProps) {
  return (
    <HierarchyProvider {...config}>
      <ul className={className}>
        <Children children={data} />
      </ul>
    </HierarchyProvider>
  );
}

export const HierarchyList: ComponentType<HierarchyListProps> = styled(HierarchyListBase)``;

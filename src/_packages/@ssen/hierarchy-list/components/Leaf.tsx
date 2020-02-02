import React from 'react';
import { useHierarchy } from '../context/hierarchy';
import { TreeNode } from '../types';

export interface LeafProps {
  node: TreeNode;
}

export function Leaf({node}: LeafProps) {
  const {titleRenderer} = useHierarchy();
  
  return (
    <span>
      {titleRenderer(node)}
    </span>
  );
}
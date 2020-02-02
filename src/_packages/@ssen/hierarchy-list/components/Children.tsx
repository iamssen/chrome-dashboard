import React, { Fragment } from 'react';
import { useHierarchy } from '../context/hierarchy';
import { TreeNode } from '../types';
import { Branch } from './Branch';
import { Leaf } from './Leaf';

export interface ChildrenProps {
  children: TreeNode[] | undefined;
}

export function Children({children}: ChildrenProps) {
  const {dataAttribute} = useHierarchy();
  
  return (
    <Fragment>
      {
        children?.map(node => (
          <li key={node.id} {...dataAttribute(node)}>
            {
              node.children
                ? <Branch node={node}/>
                : <Leaf node={node}/>
            }
          </li>
        ))
      }
    </Fragment>
  );
}
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { useHierarchy } from '../context/hierarchy';
import { TreeNode } from '../types';
import { Children } from './Children';

export interface BranchProps {
  node: TreeNode;
}

export function Branch({ node }: BranchProps) {
  const { openProvider, initialOpen, openRenderer, titleRenderer, allFolderOpen } = useHierarchy();
  const [open, setOpen] = useState<boolean>(false);

  const toggle: () => void = useCallback(() => {
    const nextOpen: boolean = !open;
    openProvider.update(node.id, nextOpen);
  }, [node.id, open, openProvider]);

  useEffect(() => {
    const subscription: Subscription = openProvider.subscribe(node.id, initialOpen(node)).subscribe(setOpen);
    return () => {
      subscription.unsubscribe();
    };
  }, [openProvider, initialOpen, node.id, node.source, node]);

  return (
    <Fragment>
      <span>
        {openRenderer(open, toggle)}
        {titleRenderer(node)}
      </span>
      {node.children && (open || allFolderOpen) && (
        <ul>
          <Children children={node.children} />
        </ul>
      )}
    </Fragment>
  );
}

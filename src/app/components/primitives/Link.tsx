import { hasTag } from '@ssen/dashboard-provider/model/title';
import React, { CSSProperties, MouseEvent, useCallback } from 'react';
import { useApp } from '../../context/app';
import { Title } from './Title';

export interface LinkProps {
  href: string;
  title: string;
}

export function Link({ href, title }: LinkProps) {
  const { openNewTab } = useApp();

  const style: CSSProperties = hasTag('-1')(title) ? { opacity: 0.2 } : {};

  const open = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      if (openNewTab || event.ctrlKey) {
        chrome.tabs.create({ url: href });
      } else {
        chrome.tabs.getCurrent((tab) => {
          if (!event.ctrlKey && tab && tab.id) {
            chrome.tabs.update(tab.id, { url: href });
          } else {
            chrome.tabs.create({ url: href });
          }
        });
      }
    },
    [href, openNewTab],
  );

  return (
    <a href={href} onClick={open} style={style}>
      <Title text={title} />
    </a>
  );
}

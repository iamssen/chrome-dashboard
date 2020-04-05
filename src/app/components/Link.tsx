import React from 'react';
import { useApp } from '../context/app';

export interface LinkProps {
  href: string;
  title: string;
}

export function Link({ href, title }: LinkProps) {
  const { openNewTab } = useApp();

  return (
    <a href={href} target={openNewTab ? '_blank' : '_self'}>
      {title}
    </a>
  );
}

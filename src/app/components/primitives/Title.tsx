import React from 'react';

export interface TitleProps {
  text: string;
}

export function Title({ text }: TitleProps) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: text.replace(/(#[a-z0-9]+)/gi, '<span style="opacity: 0.4">$1</span>') }}
    />
  );
}

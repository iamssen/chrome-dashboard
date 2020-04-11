import { PadListDoc } from '@ssen/dashboard-provider';
import React from 'react';
import { Link } from './Link';

export const printDoc = (docs: PadListDoc[]) => {
  return docs.map(({ title, id, url }) => (
    <li key={id}>
      <Link href={`https://paper.dropbox.com${url}`} title={title} />
    </li>
  ));
};

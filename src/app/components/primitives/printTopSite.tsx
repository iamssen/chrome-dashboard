import React from 'react';
import { Link } from './Link';

export const printTopSite = (topSites: chrome.topSites.MostVisitedURL[]) => {
  return topSites.map(({ title, url }) => (
    <li key={url}>
      <Link href={url} title={title} />
    </li>
  ));
};

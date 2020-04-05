import React from 'react';
import { useApp } from '../context/app';

export function OpenNewTabButton() {
  const { openNewTab, updateOpenNewTab } = useApp();

  return <button onClick={() => updateOpenNewTab(!openNewTab)}>open new tab: {openNewTab.toString()}</button>;
}

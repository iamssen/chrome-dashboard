import { LocalStorageOpenProvider, OpenProvider } from '@ssen/hierarchy-list';
import { useMemo } from 'react';

export function useHierarchyListOpenProvider(id: string): OpenProvider {
  return useMemo<OpenProvider>(() => {
    return new LocalStorageOpenProvider({ id });
  }, [id]);
}

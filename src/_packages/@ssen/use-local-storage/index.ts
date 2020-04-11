import { useCallback, useEffect, useState } from 'react';

interface UseLocalStorageParams<T extends {}> {
  id: string;
  defaultValue: () => T;
  interval?: number;
}

export function useLocalStorage<T extends {}>({
  id,
  defaultValue,
  interval,
}: UseLocalStorageParams<T>): [T, (value: Partial<T>) => void] {
  const [str, setStr] = useState<string>(() => {
    const str = localStorage.getItem(id);
    if (str) return str;

    const defaultStr = JSON.stringify(defaultValue());
    localStorage.setItem(id, defaultStr);
    return defaultStr;
  });

  useEffect(() => {
    if (typeof interval === 'number') {
      const intervalId = setInterval(() => {
        const nextStr = localStorage.getItem(id);

        if (nextStr) {
          setStr(nextStr);
        }
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [id, interval]);

  const update = useCallback(
    (nextValue: Partial<T>) => {
      setStr((prevStr) => {
        const nextStr = JSON.stringify({
          ...JSON.parse(prevStr),
          ...nextValue,
        });

        localStorage.setItem(id, nextStr);

        return nextStr;
      });
    },
    [id],
  );

  return [JSON.parse(str), update];
}

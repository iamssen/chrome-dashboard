import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

export interface ObserveStateParams<T> {
  getState: () => Promise<T>;
  initialState?: T;
  interval?: number;
}

export function stateObserver<T>({getState, initialState, interval = 60 * 1000}: ObserveStateParams<T>): Observable<T> {
  return new Observable<T>(observer => {
    let timeoutId: number | null = null;
    
    async function fn() {
      const data: T = await getState();
      observer.next(data);
      timeoutId = +setTimeout(fn, interval);
    }
    
    if (initialState) {
      observer.next(initialState);
    }
    
    fn();
    
    return () => {
      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }
    };
  });
}

export interface UseObserveStateParams<T> {
  getState: () => Promise<T>;
  initialState: T | (() => T);
  interval?: number;
}

export function useStateObserver<T>({getState, interval = 60 * 1000, initialState}: UseObserveStateParams<T>): T {
  const [state, setState] = useState<T>(initialState);
  
  useEffect(() => {
    const subscription: Subscription = stateObserver({getState, interval}).subscribe(setState);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [getState, interval]);
  
  return state;
}
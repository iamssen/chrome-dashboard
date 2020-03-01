import { Observable } from 'rxjs';

export interface OpenProvider {
  subscribe: (id: string, initialOpen: boolean) => Observable<boolean>;
  update: (id: string, open: boolean) => void;
}

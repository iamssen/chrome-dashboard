import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpenProvider } from './OpenProvider';

export interface LocalStorageOpenProviderConfig {
  id: string;
}

type State = { [key: string]: boolean };

function getStorage(id: string): State {
  const value: string | null | undefined = localStorage.getItem(id);
  if (!value) return {};
  return JSON.parse(value);
}

function setStorage(id: string, nextState: State) {
  localStorage.setItem(id, JSON.stringify(nextState));
}

export class LocalStorageOpenProvider implements OpenProvider {
  private readonly subject: BehaviorSubject<State>;
  private readonly id: string;

  constructor(private config: LocalStorageOpenProviderConfig) {
    this.id = `--hierarchy-list--${this.config.id}`;
    this.subject = new BehaviorSubject<State>(getStorage(this.id));
  }

  subscribe = (key: string, initialOpen: boolean) => {
    if (typeof this.subject.getValue()[key] !== 'boolean') {
      this.subject.next({
        ...this.subject.getValue(),
        [key]: initialOpen,
      });
    }

    return this.subject.pipe(map<State, boolean>((state) => state[key]));
  };

  update = (key: string, open: boolean) => {
    const nextState: State = {
      ...this.subject.getValue(),
      [key]: open,
    };

    setStorage(this.id, nextState);

    this.subject.next(nextState);
  };
}

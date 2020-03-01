import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OpenProvider } from './OpenProvider';

export interface LocalStorageOpenProviderConfig {
  id: string;
}

type State = { [key: string]: boolean };

function getStorage(): State {
  const value: string | null | undefined = localStorage.getItem(this.id);
  if (!value) return {};
  return JSON.parse(value);
}

function setStorage(nextState: State) {
  localStorage.setItem(this.id, JSON.stringify(nextState));
}

export class LocalStorageOpenProvider implements OpenProvider {
  private readonly subject: BehaviorSubject<State>;
  private readonly id: string;

  constructor(private config: LocalStorageOpenProviderConfig) {
    this.id = `--hierarchy-list--${this.config.id}`;
    this.subject = new BehaviorSubject<State>(getStorage());
  }

  subscribe = (id: string, initialOpen: boolean) => {
    if (typeof this.subject.getValue()[id] !== 'boolean') {
      this.subject.next({
        ...this.subject.getValue(),
        [id]: initialOpen,
      });
    }

    return this.subject.pipe(map<State, boolean>(state => state[id]));
  };

  update = (id: string, open: boolean) => {
    const nextState: State = {
      ...this.subject.getValue(),
      [id]: open,
    };

    setStorage(nextState);

    this.subject.next(nextState);
  };
}

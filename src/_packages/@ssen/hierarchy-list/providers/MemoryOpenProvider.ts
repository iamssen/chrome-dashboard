import { OpenProvider } from '@ssen/hierarchy-list';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

type State = { [key: string]: boolean };

export class MemoryOpenProvider implements OpenProvider {
  private readonly subject: BehaviorSubject<State>;

  constructor() {
    this.subject = new BehaviorSubject<State>({});
  }

  subscribe = (id: string, initialOpen: boolean) => {
    if (typeof this.subject.getValue()[id] !== 'boolean') {
      this.subject.next({
        ...this.subject.getValue(),
        [id]: initialOpen,
      });
    }

    return this.subject.pipe(map<State, boolean>((state) => state[id]));
  };

  update = (id: string, open: boolean) => {
    const nextState: State = {
      ...this.subject.getValue(),
      [id]: open,
    };

    this.subject.next(nextState);
  };
}

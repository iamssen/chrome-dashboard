import { hierarchyBy } from '@ssen/hierarchy';
import { addDays, endOfDay } from 'date-fns';
import { PadListDoc, PadListFolder, Task } from '../services/dropbox-paper';

export interface DropboxPaperData {
  folders: PadListFolder[];
  docs: PadListDoc[];
  tasks: Task[];
}

// TODO 필요한 데이터들 정리

// 폴더만 보기
export interface DropboxPaperFolder {
  id: string;
  source: PadListFolder;
  children?: DropboxPaperFolder[];
}

export interface TaskGroup extends Task {
  children: Task[];
}

export function folderSortScore({ name }: PadListFolder): number {
  //return isFavorite || hasTag('f', 'favorite')(name) ? 2 : hasTag('n', 'next')(name) ? 1 : hasTag('-1')(name) ? -2 : 0;
  return hasTag('-1')(name) ? -2 : 0;
}

export function folderSortFunction(a: PadListFolder, b: PadListFolder): number {
  const score = folderSortScore(b) - folderSortScore(a);
  return score !== 0 ? score : a.name > b.name ? 1 : -1;
}

export function sortFolders(folders: PadListFolder[]): PadListFolder[] {
  return folders.sort(folderSortFunction);
}

export function hierarchyFolders(folders: PadListFolder[]): DropboxPaperFolder[] {
  return hierarchyBy<PadListFolder, DropboxPaperFolder>({
    data: folders,
    id: ({ id }) => id,
    parentId: ({ parentFolders }) => parentFolders[0]?.id,
    map: (source) => ({ id: source.id, source }),
    link: (parent, child) => {
      parent.children = parent.children || [];
      parent.children.push(child);
    },
  });
}

export const hasTag = (...tags: string[]) => (title: string): boolean => {
  for (const tag of tags) {
    if (title.indexOf('#' + tag) > -1) {
      return true;
    }
  }
  return false;
};

export function isFavoriteDoc(doc: PadListDoc): boolean {
  return doc.docPreferences.isFavorite || hasTag('f', 'favorite')(doc.title);
}

export function filterFavoriteDocs(docs: PadListDoc[]): PadListDoc[] {
  return docs.filter(isFavoriteDoc);
}

export function filterUncategoriezedDocs(docs: PadListDoc[]): PadListDoc[] {
  return docs.filter(({ folder }) => !folder);
}

export const filterDocsWithTags = (...tags: string[]) => (docs: PadListDoc[]): PadListDoc[] => {
  return docs.filter(({ title }) => hasTag(...tags)(title));
};

export function taskSortFunction(a: Task, b: Task): number {
  if (a.dueDate || b.dueDate) {
    return (
      (a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER) -
      (b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER)
    );
  } else if (a.lastViewed || b.lastViewed) {
    return (
      (b.lastViewed ? new Date(b.lastViewed).getTime() : 0) - (a.lastViewed ? new Date(a.lastViewed).getTime() : 0)
    );
  } else {
    return a.title > b.title ? 1 : -1;
  }
}

export function sortTasks(tasks: Task[]): Task[] {
  return tasks.sort(taskSortFunction);
}

export function filterTasksToday(tasks: Task[]): Task[] {
  const today: Date = new Date();
  const end: Date = endOfDay(today);

  return tasks.filter(({ dueDate }) => {
    return !dueDate ? false : new Date(dueDate) < end;
  });
}

export function filterTasksNotToday(tasks: Task[]): Task[] {
  const today: Date = new Date();
  const end: Date = endOfDay(today);

  return tasks.filter(({ dueDate }) => {
    return !dueDate ? true : new Date(dueDate) > end;
  });
}

export function filterTasks7Days(tasks: Task[]): Task[] {
  const today: Date = new Date();
  const end: Date = addDays(endOfDay(today), 7);

  return tasks.filter(({ dueDate }) => {
    return !dueDate ? false : new Date(dueDate) < end;
  });
}

export function groupTasks(tasks: Task[]): TaskGroup[] {
  const groups: TaskGroup[] = [];
  const index: Map<string, TaskGroup> = new Map();

  for (const task of tasks) {
    if (!index.has(task.padUrl)) {
      const group: TaskGroup = { ...task, children: [] };
      groups.push(group);
      index.set(task.padUrl, group);
    }
    const group: TaskGroup = index.get(task.padUrl)!;
    group.children.push(task);
  }

  return groups;
}

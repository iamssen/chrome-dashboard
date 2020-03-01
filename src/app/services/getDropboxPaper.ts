import { get } from 'js-cookie';
import { DropboxPaperData } from '../model/dropbox-paper';
import { Folder, PAD_LIST, PAD_LIST_FOLDER, PadListDoc, PadListFolder, Task } from './dropbox-paper';

async function listTask(): Promise<Task[]> {
  const res: Response = await fetch(
    '/tasks/list?onlyCompleted=false&excludeWontFix=true&type=tasks-assigned-to-me&padId=',
  );
  const { tasks } = await res.json();
  return tasks;
}

async function listFolders(): Promise<Folder[]> {
  const res: Response = await fetch('/folder/list');
  const { data } = await res.json();
  return data;
}

async function listFavoriteFolders(): Promise<Folder[]> {
  const res: Response = await fetch('/folder/list-favorites');
  const { data } = await res.json();
  return data;
}

async function padList(): Promise<PadListDoc[]> {
  const xsrf: string = get('xsrf') || '';
  const body: string = encodeURI(
    `query=${PAD_LIST}&variables=${JSON.stringify({
      filter: 1,
      limit: 1000,
    })}&xsrf=${xsrf}`,
  );

  const res: Response = await fetch('/graphql/pad_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const { result } = await res.json();
  return result.docs;
}

async function padListFolder(folderId: string, isFavorite: boolean): Promise<PadListFolder> {
  const xsrf: string = get('xsrf') || '';
  const body: string = encodeURI(
    `query=${PAD_LIST_FOLDER}&variables=${JSON.stringify({ encryptedFolderId: folderId })}&xsrf=${xsrf}`,
  );

  const res: Response = await fetch('/graphql/pad_list_folder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const { result } = await res.json();

  return { ...result.folders[0], isFavorite };
}

export async function getDropboxPaper(): Promise<DropboxPaperData> {
  const favoriteFolders: Folder[] = await listFavoriteFolders();

  const favorites: Set<string> = new Set<string>();

  for (const { folder } of favoriteFolders) {
    favorites.add(folder.encryptedId);
  }

  const folderList: Folder[] = await listFolders();

  const folders: PadListFolder[] = await Promise.all<PadListFolder>(
    folderList.map(({ folder }) => padListFolder(folder.encryptedId, favorites.has(folder.encryptedId))),
  );

  const docs: PadListDoc[] = await padList();

  const tasks: Task[] = await listTask();

  return {
    folders,
    docs,
    tasks,
  };
}

import { PadListDoc, PadListFolder, Task } from '../services/dropbox-paper';

export interface DropboxPaperData {
  folders: PadListFolder[];
  docs: PadListDoc[];
  tasks: Task[];
}
import { TaskGroup } from '@ssen/dashboard-provider';
import { format } from 'date-fns';
import React from 'react';
import { Link } from './Link';
import { CheckBox as Check } from '@material-ui/icons';

export const printTaskGroup = ({ printDate = true }: { printDate?: boolean } = {}) => (tasks: TaskGroup[]) => {
  return tasks.map(({ padUrl, title, children }) => (
    <li key={padUrl}>
      <h4 style={{ margin: 0 }}>{title}</h4>
      <ul style={{ margin: '0 0 5px 0' }}>
        {children.map(({ usuallyUniqueId, padUrl, textline, dueDate, encryptedId }) => (
          <li key={encryptedId}>
            <Check style={{ marginRight: 5 }} />
            <Link
              href={`${padUrl}#:hluuid=${usuallyUniqueId}`}
              title={`${printDate && dueDate ? format(new Date(dueDate), 'yyyy-MM-dd') : ''} ${textline.substring(1)}`}
            />
          </li>
        ))}
      </ul>
    </li>
  ));
};

# Start development

```bash
npm start
```

# Build

```bash
npm run build
```

# Source Import Sample

## Jest 
<!-- import src/__tests__/*.{js,jsx,ts,tsx} --title-tag h3 -->

### src/\_\_tests\_\_/sample.ts


```ts
describe('Sample', () => {
  test('Test', () => {
    expect('text').toEqual('text');
  });
});

```

<!-- importend -->

<!-- import src/**/*.test.{js,jsx,ts,tsx} --title-tag h3 -->
<!-- importend -->

## Storybook
<!-- import src/**/*.stories.{js,jsx,ts,tsx} --title-tag h3 -->

### src/\_packages/@ssen/hierarchy\-list/\_\_stories\_\_/HierarchyList.stories.tsx


```tsx
import { hierarchyBy, someHierarchy } from '@ssen/hierarchy';
import { HierarchyList, MemoryOpenProvider, TreeNode } from '@ssen/hierarchy-list';
import { storiesOf } from '@storybook/react';
import React from 'react';

interface Data {
  title: string;
  favorite: boolean;
}

const data: Data[] = [
  { title: 'A', favorite: false },
  { title: 'A1', favorite: false },
  { title: 'A2', favorite: false },
  { title: 'A3', favorite: false },
  { title: 'A31', favorite: false },
  { title: 'A32', favorite: false },
  { title: 'A33', favorite: false },
  { title: 'B', favorite: true },
  { title: 'B1', favorite: false },
  { title: 'B2', favorite: true },
  { title: 'B3', favorite: true },
  { title: 'C', favorite: false },
  { title: 'C1', favorite: false },
  { title: 'C2', favorite: false },
  { title: 'C3', favorite: false },
  { title: 'C31', favorite: false },
  { title: 'C32', favorite: true },
  { title: 'C33', favorite: false },
  { title: 'C4', favorite: false },
  { title: 'C41', favorite: false },
  { title: 'C42', favorite: false },
  { title: 'C43', favorite: false },
];

function dropLastCharacter(str: string): string {
  const chars: string[] = str.split('');
  chars.pop();
  return chars.join('');
}

const nodes: TreeNode<Data>[] = hierarchyBy<Data, TreeNode<Data>>({
  data,
  id: 'title',
  parentId: ({ title }) => dropLastCharacter(title),
  map: source => ({ id: source.title, source }),
  link: (parent, child) => {
    parent.children = parent.children || [];
    parent.children.push(child);
  },
});

storiesOf('hierarchy-list', module).add('basic', () => {
  return (
    <HierarchyList
      data={nodes}
      openProvider={new MemoryOpenProvider()}
      allFolderOpen={false}
      initialOpen={({ source: { favorite }, children }: TreeNode<Data>) => {
        if (favorite) return true;
        if (!children) return false;
        return someHierarchy({
          data: children,
          children: 'children',
          some: ({ source }) => source.favorite,
        });
      }}
      titleRenderer={({ source: { title, favorite } }: TreeNode<Data>) => (
        <>
          {favorite && '⭐️'}
          {title}
        </>
      )}
      dataAttribute={({ source: { title, favorite } }: TreeNode<Data>) => ({
        'data-title': title,
        'data-favorite': favorite.toString(),
      })}
      openRenderer={(open, onToggle) => <button onClick={onToggle}>{open ? '[+]' : '[-]'}</button>}
    />
  );
});

```


### src/app/components/Title.stories.tsx


```tsx
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Title } from './Title';

storiesOf('Title', module)
  .add('text=Hello?', () => <Title text="Hello?" />)
  .add('text=World?', () => <Title text="World?" />);

```

<!-- importend -->
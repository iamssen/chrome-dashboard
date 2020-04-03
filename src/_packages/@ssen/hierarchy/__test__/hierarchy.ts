import { flattenHierarchy, hierarchyBy, someHierarchy } from '@ssen/hierarchy';

describe('hierarchy', () => {
  type F = { id: string; parent?: string };
  type H = { id: string; parent?: string; children?: H[] };

  const flat: F[] = [
    { id: 'a' },
    { id: 'a1', parent: 'a' },
    { id: 'a2', parent: 'a' },
    { id: 'a3', parent: 'a' },
    { id: 'a31', parent: 'a3' },
    { id: 'a32', parent: 'a3' },
    { id: 'b' },
    { id: 'b1', parent: 'b' },
    { id: 'b2', parent: 'b' },
    { id: 'b3', parent: 'b' },
    { id: 'c' },
    { id: 'c1', parent: 'c' },
    { id: 'c2', parent: 'c' },
    { id: 'c3', parent: 'c' },
  ];

  const hierarchy: H[] = [
    {
      id: 'a',
      children: [
        { id: 'a1', parent: 'a' },
        { id: 'a2', parent: 'a' },
        {
          id: 'a3',
          parent: 'a',
          children: [
            { id: 'a31', parent: 'a3' },
            { id: 'a32', parent: 'a3' },
          ],
        },
      ],
    },
    {
      id: 'b',
      children: [
        { id: 'b1', parent: 'b' },
        { id: 'b2', parent: 'b' },
        { id: 'b3', parent: 'b' },
      ],
    },
    {
      id: 'c',
      children: [
        { id: 'c1', parent: 'c' },
        { id: 'c2', parent: 'c' },
        { id: 'c3', parent: 'c' },
      ],
    },
  ];

  test('should return a hierarchy object', () => {
    expect(
      hierarchyBy<F, H>({
        data: flat,
        id: 'id',
        parentId: 'parent',
        map: (datum) => ({ ...datum }),
        link: (parent, child) => {
          parent.children = parent.children || [];
          parent.children.push(child);
        },
      }),
    ).toEqual(hierarchy);
  });

  test('should return a flat object', () => {
    expect(
      flattenHierarchy<H, F>({
        data: hierarchy,
        children: 'children',
        map: ({ id, parent }) => ({ id, parent }),
      }),
    ).toEqual(flat);
  });

  test('should find matched titles', () => {
    expect(
      someHierarchy<H>({
        data: hierarchy,
        children: 'children',
        some: ({ id }) => id === 'a',
      }),
    ).toBeTruthy();

    expect(
      someHierarchy<H>({
        data: hierarchy,
        children: 'children',
        some: ({ id }) => id === 'a3',
      }),
    ).toBeTruthy();

    expect(
      someHierarchy<H>({
        data: hierarchy,
        children: 'children',
        some: ({ id }) => id === 'a31',
      }),
    ).toBeTruthy();

    expect(
      someHierarchy<H>({
        data: hierarchy,
        children: 'children',
        some: ({ id }) => id === 'd',
      }),
    ).toBeFalsy();
  });
});

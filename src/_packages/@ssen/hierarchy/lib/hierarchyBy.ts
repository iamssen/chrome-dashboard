interface Params<F extends {}, H extends {}> {
  data: F[];
  id: string | ((datum: F) => string);
  parentId: string | ((datum: F) => string | undefined);
  map: (datum: F, id: string, parentId: string | undefined) => H;
  link: (parent: H, child: H) => void;
}

export function hierarchyBy<F extends {}, H extends {}>({ data, id, parentId, map, link }: Params<F, H>): H[] {
  const hierarchy: H[] = [];
  const children: Map<H, string> = new Map();
  const parentIndex: Map<string, H> = new Map();

  for (const datum of data) {
    const datumId: string = typeof id === 'function' ? id(datum) : datum[id];
    const datumParentId: string | undefined = typeof parentId === 'function' ? parentId(datum) : datum[parentId];

    const obj: H = map(datum, datumId, datumParentId);
    if (!datumParentId) {
      hierarchy.push(obj);
    } else {
      children.set(obj, datumParentId);
    }
    parentIndex.set(datumId, obj);
  }

  for (const [child, datumParentId] of children) {
    link(parentIndex.get(datumParentId)!, child);
  }

  return hierarchy;
}

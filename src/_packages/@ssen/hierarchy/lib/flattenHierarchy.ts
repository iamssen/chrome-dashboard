interface Params<H extends {}, F extends {}> {
  data: H[];
  children: string | ((datum: H) => H[] | undefined);
  map: (datum: H, parent?: H) => F;
}

export function flattenHierarchy<H extends {}, F extends {}>({ data, children, map }: Params<H, F>): F[] {
  const flat: F[] = [];

  function fn(arr: H[], parent?: H) {
    for (const datum of arr) {
      const obj: F = map(datum, parent);
      flat.push(obj);
      const datumChildren: H[] | undefined = typeof children === 'function' ? children(datum) : datum[children];
      if (datumChildren) {
        fn(datumChildren);
      }
    }
  }

  fn(data);

  return flat;
}

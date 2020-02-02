interface Params<H extends {}> {
  data: H[];
  children: string | ((datum: H) => H[] | undefined);
  some: (datum: H) => boolean;
}

export function someHierarchy<H extends {}>({
                                              data,
                                              children,
                                              some,
                                            }: Params<H>): boolean {
  function fn(arr: H[]): boolean {
    for (const datum of arr) {
      if (some(datum)) {
        return true;
      }
      
      const datumChildren: H[] | undefined = typeof children === 'function' ? children(datum) : datum[children];
      if (datumChildren) {
        if (fn(datumChildren)) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  return fn(data);
}
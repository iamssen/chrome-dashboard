export const hasTag = (...tags: string[]) => (title: string): boolean => {
  for (const tag of tags) {
    if (title.indexOf('#' + tag) > -1) {
      return true;
    }
  }
  return false;
};

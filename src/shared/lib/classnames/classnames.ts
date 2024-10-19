const concatenate = (a: string, b: string) => {
  if (a && b) {
    return `${a} ${b}`;
  }
  return a || b;
};

export const classnames = (
  ...args: (string | null | undefined | Record<string, boolean | null | undefined>)[]
): string => {
  return args.reduce<string>((acc, arg) => {
    if (!arg) {
      return acc;
    }

    if (typeof arg === "string") {
      return concatenate(acc, arg);
    }

    return Object.entries(arg).reduce((acc, [key, value]) => {
      if (value && key) {
        return concatenate(acc, key);
      }

      return acc;
    }, acc);
  }, "");
};

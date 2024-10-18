export const classnames = (
  ...args: (string | null | undefined | Record<string, boolean | null | undefined>)[]
): string => {
  return args.reduce<string>((acc, arg) => {
    if (!arg) {
      return acc;
    }

    if (typeof arg === "string") {
      return `${acc} ${arg}`;
    }

    return Object.entries(arg).reduce((acc, [key, value]) => {
      if (value && key) {
        return `${acc} ${key}`;
      }

      return acc;
    }, acc);
  }, "");
};

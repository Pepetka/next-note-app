const localStorageMock = () => {
  let store: Record<string, string | undefined> = {};

  return {
    setItem(key: string, value: string) {
      store[key] = value;
    },
    getItem(key: string) {
      return store[key];
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      store[key] = undefined;
    },
  };
};

export const mockLocalStorage = () => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock(),
  });
};

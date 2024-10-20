export const mockVirtualList = () => {
  Object.defineProperty(Element.prototype, "getBoundingClientRect", {
    configurable: true,
    value: jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => {},
      };
    }),
  });
};

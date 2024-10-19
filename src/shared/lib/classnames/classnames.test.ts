import { classnames } from "@/shared/lib";

describe("classnames", () => {
  it("empty", () => {
    expect(classnames()).toBe("");
  });
  it("one", () => {
    expect(classnames("a")).toBe("a");
  });
  it("two", () => {
    expect(classnames("a", "b")).toBe("a b");
  });
  it("object", () => {
    expect(classnames({ a: true, b: false })).toBe("a");
  });
  it("one with object", () => {
    expect(classnames("a", { b: true })).toBe("a b");
  });
});

import { mockLocalStorage } from "@/shared/test";
import { ToDosLS } from "@/shared/lib";
import type { ToDo } from "@/shared/types/ToDo";

mockLocalStorage();

describe("ToDosLS", () => {
  const items: ToDo[] = [
    { id: "1", title: "test", checked: true },
    { id: "2", title: "test", checked: false },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it("add toDos", () => {
    expect(ToDosLS.getSavedToDos()).toEqual([]);
    ToDosLS.saveToDos(items);
    expect(ToDosLS.getSavedToDos()).toEqual(items);
  });

  it("clear toDos", () => {
    expect(ToDosLS.getSavedToDos()).toEqual([]);
    ToDosLS.saveToDos(items);
    expect(ToDosLS.getSavedToDos()).toEqual(items);
    ToDosLS.clearToDos();
    expect(ToDosLS.getSavedToDos()).toEqual([]);
  });
});

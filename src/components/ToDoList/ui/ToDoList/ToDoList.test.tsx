import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockVirtualList, mockLocalStorage } from "@/shared/test";
import { StoreProvider } from "@/shared/providers";
import type { ToDo } from "@/shared/types/ToDo";
import { ToDosLS } from "@/shared/lib";
import { ToDoList } from "./ToDoList";

mockLocalStorage();
mockVirtualList();

describe("ToDoList", () => {
  const toDos: ToDo[] = [
    { id: "1", title: "Test todo Title", checked: false },
    { id: "2", title: "Test todo Title", checked: true },
    { id: "3", title: "Test todo Title", checked: false },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  it("to be in the document", () => {
    render(<ToDoList filter="all" />);

    expect(screen.getByTestId("ToDoList__Loader")).toBeInTheDocument();
  });

  it("empty toDo list", () => {
    render(<ToDoList filter="all" />, { wrapper: StoreProvider });

    expect(screen.getByTestId("ToDoList__Empty")).toBeInTheDocument();
  });

  it("render toDo list", async () => {
    ToDosLS.saveToDos(toDos);
    render(<ToDoList filter="all" />, { wrapper: StoreProvider });

    expect(screen.getByTestId("ToDoList")).toBeInTheDocument();
    const items = await screen.findAllByText("Test todo Title");
    expect(items.length).toBe(3);
  });

  it("delete toDo", async () => {
    ToDosLS.saveToDos(toDos);
    render(<ToDoList filter="all" />, { wrapper: StoreProvider });

    const deleteButton = screen.getByTestId("ToDoListItem2__Delete");
    await userEvent.click(deleteButton);
    expect(ToDosLS.getSavedToDos()).toEqual([toDos[0], toDos[2]]);
    const items = await screen.findAllByText("Test todo Title");
    expect(items.length).toBe(2);
  });

  it("check toDo", async () => {
    ToDosLS.saveToDos(toDos);
    render(<ToDoList filter="all" />, { wrapper: StoreProvider });

    const check = screen.getByTestId("ToDoListItem2__Checkbox");
    expect(check).toBeChecked();
    await userEvent.click(check);
    expect(ToDosLS.getSavedToDos()).toEqual(toDos.map((todo) => ({ ...todo, checked: false })));
    expect(check).not.toBeChecked();
  });
});

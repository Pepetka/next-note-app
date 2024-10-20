import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockLocalStorage, mockVirtualList } from "@/shared/test";
import { StoreProvider } from "@/shared/providers";
import { ToDosLS } from "@/shared/lib";
import HomePage from "./page";

mockLocalStorage();
mockVirtualList();

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("to be in the document", () => {
    render(<HomePage searchParams={{ filter: "all" }} />, { wrapper: StoreProvider });
    expect(screen.getByTestId("HomePage")).toBeInTheDocument();
  });

  it("add toDos", async () => {
    render(<HomePage searchParams={{ filter: "all" }} />, { wrapper: StoreProvider });

    const input = screen.getByTestId("AddToDoForm__Input");
    await userEvent.type(input, "Test todo Title{enter}");
    expect(ToDosLS.getSavedToDos()[0]?.title).toBe("Test todo Title");

    const items = await screen.findAllByText("Test todo Title");
    expect(items.length).toBe(1);
  });
});

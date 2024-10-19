import { AddToDoForm } from "./AddToDoForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoreProvider } from "@/shared/providers";
import { mockLocalStorage } from "@/shared/test";
import { ToDosLS } from "@/shared/lib";

mockLocalStorage();

describe("AddToDoForm", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("to be in the document", () => {
    render(<AddToDoForm />, { wrapper: StoreProvider });
    expect(screen.getByTestId("AddToDoForm")).toBeInTheDocument();
  });

  it("clear the form", async () => {
    const form = render(<AddToDoForm />, { wrapper: StoreProvider });
    const input = form.getByTestId("AddToDoForm__Input");
    await userEvent.type(input, "test todo item");
    expect(input).toHaveValue("test todo item");
    const button = form.getByTestId("AddToDoForm__Button");
    await userEvent.click(button);
    expect(input).toHaveValue("");
  });

  it("add a todo", async () => {
    const form = render(<AddToDoForm />, { wrapper: StoreProvider });
    const input = form.getByTestId("AddToDoForm__Input");
    await userEvent.type(input, "test todo item{enter}");
    expect(ToDosLS.getSavedToDos()[0]?.title).toBe("test todo item");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockRouter, mockRouter } from "@/shared/test";
import { Controls } from "./Controls";

describe("Controls", () => {
  beforeAll(() => {
    mockRouter();
  });

  it("to be in the document", () => {
    render(<Controls filter="all" />);
    expect(screen.getByTestId("Controls")).toBeInTheDocument();
  });

  it("to have active class", () => {
    render(<Controls filter="active" />);
    expect(screen.getByTestId("Controls__all-button")).not.toHaveClass("active");
    expect(screen.getByTestId("Controls__active-button")).toHaveClass("active");
    expect(screen.getByTestId("Controls__finished-button")).not.toHaveClass("active");
  });

  it("select active filter", async () => {
    const [router, Wrapper] = createMockRouter();
    render(<Controls filter="all" />, { wrapper: Wrapper });
    await userEvent.click(screen.getByTestId("Controls__active-button"));
    expect(router.push).toHaveBeenCalledWith(
      "/?filter=active",
      expect.anything(),
      expect.anything(),
    );
  });
});

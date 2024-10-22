import { test, expect, type Page } from "@playwright/test";

test.describe("Todo", () => {
  test("should be able to add a todo", async ({ page }: { page: Page }) => {
    await page.goto("/");
    const input = page.getByTestId("AddToDoForm__Input");

    await input.fill("Buy some milk");
    await input.press("Enter");

    await expect(page.getByText("Buy some milk")).toBeVisible();
    await checkNumberOfTodosInLocalStorage(page, 1);
  });
});

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e) => {
    return JSON.parse(localStorage["toDos"]).length === e;
  }, expected);
}

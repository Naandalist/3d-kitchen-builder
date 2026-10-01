import { expect, test } from "@playwright/test";

test("opens the kitchen editor shell", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByText("3D Kitchen Builder"),
  ).toBeVisible();

  await expect(
    page.getByText("Assets"),
  ).toBeVisible();

  await expect(
    page.getByText("Select an object to edit it."),
  ).toBeVisible();
});

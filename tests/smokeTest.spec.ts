import { test, expect } from "@playwright/test";
import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { login } from "./helpers";

test("can navigate to home page", async ({ page }) => {
  setupClerkTestingToken({ page });
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vette Tracker/);
});

test("can navigate to the login page", async ({ page }) => {
  setupClerkTestingToken({ page });
  await page.goto("");

  await page.getByRole("link", { name: "Get Started" }).click();
});

test("can login", async ({ page }) => {
  await login(page);

  await expect(page.getByRole("heading", { name: "All Vettes" })).toBeVisible();
});

test("can navigate to the create vette page", async ({ page }) => {
  await login(page);

  await page.getByRole("link", { name: "Add Vette" }).click();

  await expect(
    page.getByRole("heading", { name: "Add New Vette" })
  ).toBeVisible();
});

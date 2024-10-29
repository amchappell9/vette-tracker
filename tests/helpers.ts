import { Page } from "@playwright/test";
import { setupClerkTestingToken } from "@clerk/testing/playwright";

export async function login(page: Page) {
  setupClerkTestingToken({ page });

  await page.goto("");
  await page.getByRole("link", { name: "Get Started" }).click();

  await page.getByLabel("Email address").click();
  await page
    .getByLabel("Email address")
    .fill(process.env.AUTOMATED_TESTING_USERNAME!);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Password", { exact: true }).click();
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.AUTOMATED_TESTING_PASSWORD!);
  await page.getByRole("button", { name: "Continue" }).click();
}

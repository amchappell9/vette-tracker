import { Page } from "@playwright/test";
import { setupClerkTestingToken } from "@clerk/testing/playwright";

export async function login(page: Page) {
  setupClerkTestingToken({ page });

  await page.goto("");
  await page.getByRole("link", { name: "Get Started" }).click();

  // There's also a clerk helper that you can use
  // https://github.com/clerk/clerk-playwright-nextjs/blob/main/e2e/app.spec.ts
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

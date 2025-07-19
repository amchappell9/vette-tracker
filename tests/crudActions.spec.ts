import { test, expect } from "@playwright/test";
import { login } from "./helpers";

test.describe("Vette Tracker", () => {
  test("can add, edit, and delete a vette", async ({ page }) => {
    await login(page);

    // Add a vette
    await page.getByRole("link", { name: "Add Vette" }).click();
    await page.getByLabel("Link").click();
    await page.getByLabel("Link").fill("https://www.google.com");
    await page.getByLabel("Year").selectOption("2014");
    await page.getByLabel("Z51").click();
    await page.getByLabel("3LT").click();
    await page.getByLabel("Magnetic Ride ControlAn").check();
    await page.getByLabel("NPP ExhaustAdjust the volume").check();
    await page.getByLabel("Performance Data").check();
    await page.getByLabel("Transmission").selectOption("Automatic");
    await page.getByLabel("Miles").click();
    await page.getByLabel("Miles").fill("2,0000");
    await page.getByLabel("Cost").click();
    await page.getByLabel("Cost").fill("45000");
    await page.getByRole("button", { name: "Add Vette" }).click();

    // View Vette
    await expect(
      page.getByText("Your Vette was successfully added!")
    ).toBeVisible();
    await expect(page.getByText("2014 Corvette Z51").first()).toBeVisible();
    await expect(page.getByText("$45,000")).toBeVisible();
    await expect(page.getByText("20,000 Miles")).toBeVisible();
    await expect(page.getByText("Automatic")).toBeVisible();
    await expect(page.getByText("Artic White")).toBeVisible();
    await expect(page.getByText("Red")).toBeVisible();
    await expect(page.getByText("Z51").first()).toBeVisible();
    await expect(page.getByText("3LT").first()).toBeVisible();
    await expect(page.getByText("Magnetic Ride Control")).toBeVisible();
    await expect(page.getByText("NPP Exhaust")).toBeVisible();
    await expect(
      page.getByText("Performance Data Recorder").first()
    ).toBeVisible();

    // Edit Vette
    await page.getByRole("link", { name: "Edit Vette" }).click();
    await expect(
      page.getByRole("heading", { name: "Edit Vette" })
    ).toBeVisible();

    await page.getByLabel("Year").selectOption("2019");

    // Wait for ZR1 option to become available after year selection
    await page
      .getByRole("radio", { name: "ZR1" })
      .waitFor({ state: "visible" });
    await page.getByRole("radio", { name: "ZR1" }).click();
    await page.getByLabel("1LT").click();
    await page.getByRole("button", { name: "Edit Vette" }).click();

    // Check updates
    await expect(
      page.getByText("Your Vette was successfully updated!")
    ).toBeVisible();
    await expect(page.getByText("2019 Corvette ZR1").first()).toBeVisible();
    await expect(page.getByText("1LT").first()).toBeVisible();

    // Delete Vette
    await page.getByRole("link", { name: "Delete Listing" }).click();
    await page.getByRole("button", { name: "Delete" }).click();
    await expect(page.getByText("Your Vette has been deleted!")).toBeVisible();
    await page.getByRole("link", { name: "Go to Vettes" }).click();

    await expect(page.getByText("All Vettes")).toBeVisible();
  });
});

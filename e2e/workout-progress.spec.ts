import { expect, test } from "@playwright/test";

test("completed exercise set survives a page reload", async ({ page }) => {
  await page.goto("/legs");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  const firstExercise = page.getByTestId("exercise-card-0");
  const weight = firstExercise.getByPlaceholder("Weight (kg)").first();
  const reps = firstExercise.getByPlaceholder("reps").first();

  await weight.fill("42");
  await reps.fill("8");
  await firstExercise.getByRole("checkbox").first().click();

  await expect(weight).toHaveValue("42");
  await expect(reps).toHaveValue("8");
  await expect(firstExercise.getByText("1 / 4")).toBeVisible();

  await page.reload();

  await expect(weight).toHaveValue("42");
  await expect(reps).toHaveValue("8");
  await expect(firstExercise.getByText("1 / 4")).toBeVisible();
});

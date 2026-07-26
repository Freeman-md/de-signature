import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
] as const;

async function expectTouchTargets(seats: ReturnType<Page["locator"]>) {
  for (const seat of await seats.all()) {
    const box = await seat.boundingBox();
    expect(box).not.toBeNull();
    expect(box?.width).toBeGreaterThanOrEqual(24);
    expect(box?.height).toBeGreaterThanOrEqual(24);
  }
}

async function expectAllSeatsReachable(page: Page, width: number) {
  const upperSeats = page.locator('button[aria-label^="Upper Deck seat"]');
  const lowerSeats = page.locator('button[aria-label^="Lower Deck seat"]');

  await expect(upperSeats).toHaveCount(10);
  await expect(lowerSeats).toHaveCount(10);

  if (width < 1024) {
    await expect(upperSeats.first()).toBeVisible();
    await expectTouchTargets(upperSeats);
    await page.getByRole("button", { name: /Lower Deck \d+ selected/ }).click();
  }

  await expect(lowerSeats.first()).toBeVisible();
  await expectTouchTargets(width < 1024 ? lowerSeats : page.locator("button[data-seat]"));
}

for (const viewport of viewports) {
  test(`keeps every seat reachable without horizontal overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/#seats");
    await page.getByTestId("boat-seat-selector").scrollIntoViewIfNeeded();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

    await expectAllSeatsReachable(page, viewport.width);
  });
}

test("keeps selection and keyboard operation across narrow deck switching", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#seats");

  const seatA = page.getByRole("button", { name: "Upper Deck seat A" });
  await seatA.focus();
  await page.keyboard.press("Space");
  await expect(seatA).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: /Lower Deck 0 selected/ }).click();
  const seatK = page.getByRole("button", { name: "Lower Deck seat K" });
  await seatK.focus();
  await page.keyboard.press("Enter");
  await expect(seatK).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: /Upper Deck 1 selected/ }).click();
  await expect(seatA).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("A, K", { exact: true })).toBeVisible();
});

test("keeps desktop keyboard focus in passenger-seat order", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#seats");

  const seats = page.locator("button[data-seat]");
  await expect(seats).toHaveCount(20);
  expect(await seats.evaluateAll((controls) => controls.map((control) => control.getAttribute("data-seat")))).toEqual(
    "ABCDEFGHIJKLMNOPQRST".split(""),
  );

  await seats.first().focus();
  for (let index = 1; index < 20; index += 1) {
    await page.keyboard.press("Tab");
    await expect(seats.nth(index)).toBeFocused();
  }
});

test("preserves controls and state with reduced motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#seats");

  const seatB = page.getByRole("button", { name: "Upper Deck seat B" });
  await seatB.click();
  await expect(seatB).toHaveAttribute("aria-pressed", "true");
  await expect(seatB.locator(".boat-seat__check")).toBeVisible();
});

test("matches the narrow selector visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#seats");
  await page.getByRole("button", { name: "Upper Deck seat C" }).click();

  await expect(page.getByTestId("boat-seat-selector")).toHaveScreenshot(
    "selector-phone.png",
    { animations: "disabled", maxDiffPixelRatio: 0.002 },
  );
});

test("matches the desktop selector visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#seats");
  await page.getByRole("button", { name: "Upper Deck seat C" }).click();
  await page.getByRole("button", { name: "Lower Deck seat R" }).click();

  await expect(page.getByTestId("boat-seat-selector")).toHaveScreenshot(
    "selector-desktop.png",
    { animations: "disabled", maxDiffPixelRatio: 0.002 },
  );
});

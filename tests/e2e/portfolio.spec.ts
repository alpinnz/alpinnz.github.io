import { expect, test } from "@playwright/test";

test("serves English and Indonesian pages with their own metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://alpinnz.github.io/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);

  await page.locator('a[href="/id/"]').click();

  await expect(page).toHaveURL(/\/id\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Halo, saya Alfin");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "id_ID");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://alpinnz.github.io/id/",
  );
});

test("mobile navigation opens and closes after selecting a section", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuToggle = page.locator('button[aria-controls="primary-navigation"]');
  const navigation = page.locator("#primary-navigation");

  await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
  await menuToggle.click();
  await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
  await expect(navigation).toBeVisible();

  await navigation.locator('a[href="#contact"]').click();
  await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#contact$/);
});

test("keyboard users can skip directly to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("reduced-motion preference disables portfolio card movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const projectCard = page.getByRole("button", { name: /view .* project details/i }).first();
  await projectCard.scrollIntoViewIfNeeded();
  await expect.poll(() => projectCard.evaluate((element) => getComputedStyle(element).opacity)).toBe("1");
  await expect.poll(() => projectCard.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
});

test("portfolio detail dialog closes with Escape", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /view .* project details/i }).first().click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("contact form associates validation errors with fields", async ({ page }) => {
  await page.goto("/#contact");
  await page.locator("#contact-name").fill("Visitor");
  await page.locator("#contact-email").fill("not-an-email");
  await page.locator("#contact-message").fill("Hello");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.locator("#contact-email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#contact-email-error")).toHaveText("Enter a valid email address.");
});

test("CV download creates a PDF", async ({ page }) => {
  await page.goto("/");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download CV" }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe("CV-Alfin-Noviaji.pdf");
  expect(await download.failure()).toBeNull();
});

test("configured contact form succeeds without sending a live message", async ({ page }) => {
  let formspreeRequestCount = 0;
  await page.route("https://formspree.io/f/**", async (route) => {
    formspreeRequestCount += 1;
    expect(route.request().postDataBuffer()?.toString("utf8") ?? "").toContain('name="_gotcha"');
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/#contact");
  await page.locator("#contact-name").fill("Visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("Automated test message");
  await page.getByRole("button", { name: "Send Message" }).click();

  const status = page.getByRole("status");
  await expect(status).toBeVisible();
  if (formspreeRequestCount === 0) {
    await expect(status).toHaveText("The contact form is unavailable right now. Please email alpinnz@gmail.com directly.");
    return;
  }

  await expect(status).toHaveText("Message sent. I’ll get back to you soon.");
});

test("contact form keeps the message and shows recovery guidance after a service error", async ({ page }) => {
  await page.route("https://formspree.io/f/**", async (route) => {
    await route.fulfill({ status: 503, body: "Service unavailable" });
  });

  await page.goto("/#contact");
  await page.locator("#contact-name").fill("Visitor");
  await page.locator("#contact-email").fill("visitor@example.com");
  await page.locator("#contact-message").fill("Please keep this message");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.locator('#contact [role="alert"]')).toHaveText(
    "Your message could not be sent. Please try again or email me directly.",
  );
  await expect(page.locator("#contact-message")).toHaveValue("Please keep this message");
});

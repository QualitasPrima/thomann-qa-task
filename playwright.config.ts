import { defineConfig, devices } from "@playwright/test";

/**
 * ✅ Playwright Test Configuration
 * --------------------------------
 *  - Launches Chromium in clean incognito mode (no extensions or cache)
 *  - Runs all tests under ./tests/
 *  - Uses HTML reporter
 *  - Deterministic, stable setup for CI and local debugging
 */

export default defineConfig({
  // --- Test directory ---
  testDir: "./tests",

  // --- Parallelization & retries ---
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // --- Reporter ---
  reporter: [["html", { open: "always" }]],

  // --- Shared browser / context settings ---
  use: {
    browserName: "chromium",
    headless: true,

    // Clean environment: no extensions, no saved sessions, no interference
    launchOptions: {
      args: [
        "--incognito",
        "--disable-extensions",
        "--disable-component-extensions-with-background-pages",
        "--disable-background-networking",
        "--disable-default-apps",
        "--no-first-run",
        "--no-service-autorun",
        "--password-store=basic",
        "--use-mock-keychain",
      ],
    },

    // Consistent viewport and context isolation
    contextOptions: {
      viewport: { width: 1280, height: 800 },
      permissions: [],
    },

    // Automatically record trace and screenshot on failure
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // --- Browser projects ---
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // My macOS (too old) has compatibility issues with Firefox and WebKit, so these are disabled for now but left as optional:
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});

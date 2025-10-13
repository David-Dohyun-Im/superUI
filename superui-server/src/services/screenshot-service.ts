/**
 * Screenshot service using Playwright
 * Captures screenshots of web pages for clone functionality
 */

import { chromium, type Browser } from "playwright";

let browser: Browser | null = null;

/**
 * Initialize browser instance (singleton pattern for performance)
 */
async function getBrowser(): Promise<Browser> {
  if (!browser || !browser.isConnected()) {
    console.log("🌐 Launching browser...");
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    console.log("✅ Browser launched");
  }
  return browser;
}

export interface ScreenshotOptions {
  fullPage?: boolean;
  width?: number;
  height?: number;
  waitForSelector?: string;
  delay?: number;
}

export interface ScreenshotResult {
  screenshot: string; // base64 encoded PNG
  metadata: {
    width: number;
    height: number;
    url: string;
    timestamp: string;
  };
}

/**
 * Capture screenshot of a URL
 * @param url - URL to capture
 * @param options - Screenshot options
 * @returns Screenshot data and metadata
 */
export async function captureScreenshot(url: string, options: ScreenshotOptions = {}): Promise<ScreenshotResult> {
  const { fullPage = true, width = 1920, height = 1080, waitForSelector, delay = 2000 } = options;

  console.log(`📸 Capturing screenshot: ${url}`);

  const browserInstance = await getBrowser();
  const page = await browserInstance.newPage({
    viewport: { width, height },
  });

  try {
    // Navigate to URL with timeout
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    console.log(`✅ Page loaded: ${url}`);

    // Wait for specific selector if provided
    if (waitForSelector) {
      console.log(`⏳ Waiting for selector: ${waitForSelector}`);
      await page.waitForSelector(waitForSelector, { timeout: 10000 });
    }

    // Additional delay for animations/lazy loading
    if (delay > 0) {
      await page.waitForTimeout(delay);
    }

    // Take screenshot
    const screenshot = await page.screenshot({
      fullPage,
      type: "png",
    });

    // Get page dimensions
    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    }));

    console.log(`✅ Screenshot captured: ${dimensions.width}x${dimensions.height}px`);

    return {
      screenshot: screenshot.toString("base64"),
      metadata: {
        width: dimensions.width,
        height: dimensions.height,
        url,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error(`❌ Screenshot failed for ${url}:`, error);
    throw new Error(`Failed to capture screenshot: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    await page.close();
  }
}

/**
 * Capture screenshot from local development server
 * @param localUrl - Local URL (e.g., http://localhost:3000)
 * @param options - Screenshot options
 * @returns Screenshot data and metadata
 */
export async function captureLocalScreenshot(localUrl: string = "http://localhost:3000", options: ScreenshotOptions = {}): Promise<ScreenshotResult> {
  console.log(`📸 Capturing local screenshot: ${localUrl}`);
  return captureScreenshot(localUrl, options);
}

/**
 * Close browser instance (cleanup)
 */
export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
    console.log("🔌 Browser closed");
  }
}

// Cleanup on process exit
process.on("SIGTERM", () => {
  void closeBrowser();
});

process.on("SIGINT", () => {
  void closeBrowser();
});

process.on("exit", () => {
  // Synchronous cleanup attempt
  if (browser) {
    void browser.close().catch(() => {
      // Ignore cleanup errors on exit
    });
  }
});

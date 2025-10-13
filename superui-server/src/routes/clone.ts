/**
 * Clone routes for SuperUI API Server
 * Handles clone frontend HTTP endpoints
 */

import express, { type Request, type Response } from "express";
import { handleCloneRequest, type CloneRequest } from "../services/clone-service.js";
import { captureScreenshot, type ScreenshotOptions } from "../services/screenshot-service.js";

const router = express.Router();

/**
 * POST /api/clone
 * Main stateless clone endpoint
 * Handles all clone request types
 */
router.post("/clone", (req: Request, res: Response): void => {
  void (async (): Promise<void> => {
    try {
      const body = req.body as CloneRequest;
      console.log("📥 Received clone request:", {
        requestType: body.requestType,
        hasTargetUrl: !!body.targetUrl,
        hasLocalUrl: !!body.localUrl,
        iteration: body.iteration,
        timestamp: new Date().toISOString(),
      });

      // Build clone request
      const cloneRequest: CloneRequest = {
        requestType: body.requestType,
        targetUrl: body.targetUrl,
        targetScreenshotBase64: body.targetScreenshotBase64,
        localUrl: body.localUrl,
        targetDescription: body.targetDescription,
        currentDescription: body.currentDescription,
        differences: body.differences,
        iteration: body.iteration,
        context: body.context,
        screenshotOptions: body.screenshotOptions,
      };

      // Validate request type
      const validTypes = ["initial_analysis", "component_suggestion", "compare_screenshots", "iteration_guide"];

      if (!validTypes.includes(cloneRequest.requestType)) {
        res.status(400).json({
          error: `Invalid requestType. Must be one of: ${validTypes.join(", ")}`,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // Handle the request
      const result = await handleCloneRequest(cloneRequest);

      console.log("📤 Sending clone response:", {
        requestType: cloneRequest.requestType,
        hasTargetScreenshot: !!result.screenshots?.target,
        hasCurrentScreenshot: !!result.screenshots?.current,
        componentsCount: result.components?.length || 0,
        textLength: result.text.length,
        timestamp: new Date().toISOString(),
      });

      // Return structured response
      res.json({
        text: result.text,
        screenshots: result.screenshots,
        components: result.components,
        installations: result.installations,
        metadata: {
          requestType: cloneRequest.requestType,
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        },
      });
    } catch (error) {
      console.error("❌ Clone request error:", error);

      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  })();
});

/**
 * POST /api/clone/screenshot
 * Dedicated endpoint for taking standalone screenshots
 * Useful for testing or manual screenshot capture
 */
router.post("/clone/screenshot", (req: Request, res: Response): void => {
  void (async (): Promise<void> => {
    try {
      const { url, options = {} } = req.body as { url: string; options: ScreenshotOptions };

      if (!url) {
        res.status(400).json({
          error: "URL is required",
          timestamp: new Date().toISOString(),
        });
        return;
      }

      console.log(`📸 Standalone screenshot request: ${url}`);

      const result = await captureScreenshot(url, options);

      res.json({
        screenshot: result.screenshot,
        metadata: result.metadata,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("❌ Screenshot error:", error);

      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  })();
});

export default router;

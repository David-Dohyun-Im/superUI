import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { httpClient } from "../utils/http-client.js";

const TOOL_NAME = "clone_frontend";
const TOOL_DESCRIPTION = `
Clone a target website by iteratively comparing screenshots and improving implementation.

**Workflow:**
1. **initial_analysis**: Provide target URL or screenshot, server captures screenshot and returns analysis prompt
2. **component_suggestion**: After analyzing screenshot, get component recommendations and starter template
3. **compare_screenshots**: Server captures both target and current implementation, you compare them
4. **iteration_guide**: Provide differences found, get specific improvement suggestions

The server handles all screenshot capture using Playwright. You analyze screenshots with vision and implement changes.

**Example Flow:**

Step 1: clone_frontend({ requestType: 'initial_analysis', targetUrl: 'https://example.com' })
  → Server captures screenshot and returns analysis prompt
  → You analyze screenshot with vision

Step 2: clone_frontend({ requestType: 'component_suggestion', targetDescription: "Hero with gradient, 3 feature cards..." })
  → Server recommends components and provides template
  → You install components and create initial implementation

Step 3: clone_frontend({ requestType: 'compare_screenshots', targetUrl: 'https://example.com', localUrl: 'http://localhost:3000', iteration: 1 })
  → Server captures both screenshots
  → You compare them with vision and find differences

Step 4: clone_frontend({ requestType: 'iteration_guide', differences: ["Header too tall", "Button color wrong"], iteration: 1 })
  → Server provides specific Tailwind class suggestions
  → You apply changes and repeat from Step 3

**Supported request types:**
- initial_analysis
- component_suggestion
- compare_screenshots
- iteration_guide
`;

type ScreenshotResult = {
  screenshot: string; // base64 encoded PNG
  metadata: {
    width: number;
    height: number;
    url: string;
    timestamp: string;
  };
};

type ScreenshotMetadata = ScreenshotResult["metadata"] | { source: "user-provided" | "provided-or-cached" };

type ComponentInfo = {
  componentName: string;
  displayName: string;
  packageName: string;
  importStatement: string;
  usage: string;
  description: string;
  category: string;
  tags: string[];
  library?: "shadcn-ui" | "shadcn-ai" | "shadcn-button" | "shadcn-text";
  installCommand?: string;
  documentationUrl?: string;
};

type CloneApiResponse = {
  text: string; // Prompt/guide text
  screenshots?: {
    target?: {
      data: string; // base64
      mimeType: string; // "image/png"
      metadata: ScreenshotMetadata;
    };
    current?: {
      data: string;
      mimeType: string;
      metadata: ScreenshotMetadata;
    };
  };
  components?: ComponentInfo[];
  installations?: string[];
};

export class CloneFrontendTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    requestType: z
      .enum(["initial_analysis", "component_suggestion", "compare_screenshots", "iteration_guide"])
      .describe("Type of request: initial_analysis, component_suggestion, compare_screenshots, or iteration_guide"),

    targetUrl: z.string().optional().describe("Target website URL to clone (for initial_analysis or compare_screenshots)"),

    targetScreenshotBase64: z.string().optional().describe("Base64 encoded target screenshot (alternative to targetUrl, can be reused from initial_analysis)"),

    localUrl: z.string().optional().describe("Local development server URL (for compare_screenshots, default: http://localhost:3000)"),

    targetDescription: z.string().optional().describe("Your vision analysis of the target screenshot (for component_suggestion)"),

    differences: z.array(z.string()).optional().describe("List of differences found between target and current implementation (for iteration_guide)"),

    iteration: z.number().optional().describe("Current iteration number for tracking progress (default: 1)"),

    screenshotOptions: z
      .object({
        fullPage: z.boolean().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        waitForSelector: z.string().optional(),
        delay: z.number().optional(),
      })
      .optional()
      .describe("Screenshot capture options (fullPage, viewport width/height, selector to wait for, delay)"),

    context: z.string().optional().describe("Additional context for the request"),
  });

  async execute(args: z.infer<typeof this.schema>) {
    try {
      console.log(`🎨 CloneFrontendTool executing: ${args.requestType}`);

      // Call the API server
      const { data } = await httpClient.post<CloneApiResponse>("/api/clone", {
        requestType: args.requestType,
        targetUrl: args.targetUrl,
        targetScreenshotBase64: args.targetScreenshotBase64,
        localUrl: args.localUrl || "http://localhost:3000",
        targetDescription: args.targetDescription,
        differences: args.differences,
        iteration: args.iteration || 1,
        screenshotOptions: args.screenshotOptions,
        context: args.context,
      });

      console.log(`✅ Clone request successful: ${args.requestType}`);
      console.log(`   - Has target screenshot: ${!!data.screenshots?.target}`);
      console.log(`   - Has current screenshot: ${!!data.screenshots?.current}`);
      console.log(`   - Components recommended: ${data.components?.length || 0}`);

      // Build content array with text and images
      const content: Array<{ type: "text"; text: string } | { type: "image"; data: string; mimeType: string }> = [];

      // Add text content first
      content.push({
        type: "text",
        text: data.text,
      });

      // Add target screenshot if present
      if (data.screenshots?.target) {
        console.log(`   - Adding target screenshot (${data.screenshots.target.data.length} chars)`);
        content.push({
          type: "image",
          data: data.screenshots.target.data,
          mimeType: data.screenshots.target.mimeType,
        });
      }

      // Add current screenshot if present
      if (data.screenshots?.current) {
        console.log(`   - Adding current screenshot (${data.screenshots.current.data.length} chars)`);
        content.push({
          type: "image",
          data: data.screenshots.current.data,
          mimeType: data.screenshots.current.mimeType,
        });
      }

      return { content };
    } catch (error) {
      console.error("❌ Error executing CloneFrontendTool:", error);

      const fallbackResponse = `
# Clone Frontend Error

⚠️ **API Server Unavailable**

The SuperUI API server is not responding.

**Error Details:** ${error instanceof Error ? error.message : "Unknown error"}
      `;

      return {
        content: [
          {
            type: "text" as const,
            text: fallbackResponse,
          },
        ],
      };
    }
  }
}

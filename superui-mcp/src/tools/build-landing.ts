import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { httpClient } from "../utils/http-client.js";

const TOOL_NAME = "build_landing";
const TOOL_DESCRIPTION = `
"Use this tool when the user wants to create a landing page template through conversation.
This tool will guide the user through a series of questions to understand their needs and generate a customized template.

When to use this tool:
1. When user types "/template" or "/ui template" command
2. When user asks to create a landing page
3. When user wants to build a marketing website
4. When user needs a complete page template

The tool will:
- Ask targeted questions about the landing page purpose
- Understand target audience and goals
- Generate appropriate section combinations
- Provide Tailark component recommendations
- Create a complete template structure

Example usage:
- "/template create a landing page"
- "I need a SaaS landing page"
- "Build me a marketing template"
- "Create a landing page for my mobile app"
`;

interface BuildLandingResponse {
  result: string;
  conversationState?: {
    currentStep: number;
    totalSteps: number;
    answers: Record<string, string>;
    nextQuestion?: string;
  };
}

export class BuildLandingTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    message: z.string().describe("Full user's message requesting the template"),
    conversationState: z.object({
      currentStep: z.number().describe("Current step in the conversation (0-4)"),
      totalSteps: z.number().describe("Total number of steps (4)"),
      answers: z.record(z.string()).describe("Previous answers from the user"),
      nextQuestion: z.string().optional().describe("Next question to ask the user")
    }).optional().describe("Current state of the conversation"),
    absolutePathToCurrentFile: z
      .string()
      .describe("Absolute path to the current file where the template will be used"),
    absolutePathToProjectDirectory: z
      .string()
      .describe("Absolute path to the project root directory"),
    standaloneRequestQuery: z
      .string()
      .describe("Complete request query with context for template generation")
  });

  async execute({
    message,
    conversationState,
    absolutePathToCurrentFile,
    absolutePathToProjectDirectory,
    standaloneRequestQuery,
  }: z.infer<typeof this.schema>) {
    try {
      console.log(`🎨 BuildLandingTool executing for: ${message}`);
      console.log(`📁 Project: ${absolutePathToProjectDirectory}`);
      console.log(`📄 Current file: ${absolutePathToCurrentFile}`);

      // Call the API server for template generation
      const { data } = await httpClient.post<BuildLandingResponse>(
        "/api/template",
        {
          message,
          conversationState,
          absolutePathToCurrentFile,
          absolutePathToProjectDirectory,
          standaloneRequestQuery,
        }
      );

      console.log(`✅ Template information retrieved successfully`);

      return {
        content: [
          {
            type: "text" as const,
            text: data.result,
          },
        ],
      };
    } catch (error) {
      console.error("❌ Error executing BuildLandingTool:", error);
      
      // Provide fallback response if API server is not available
      const fallbackResponse = `
# Template Generation Guide

## Template Request: ${message}

⚠️ **API Server Unavailable**

The SuperUI API server is not responding. Here's a manual template creation guide:

### Manual Template Creation
\`\`\`bash
cd ${absolutePathToProjectDirectory}
pnpm dlx shadcn add @tailark/hero-section-1
pnpm dlx shadcn add @tailark/features-1
pnpm dlx shadcn add @tailark/pricing-1
\`\`\`

### Available Tailark Components
Visit https://tailark.com to browse all available components:
- Hero sections (9 variants)
- Features sections (12 variants)
- Pricing tables (5 variants)
- Testimonials (6 variants)
- Call-to-action sections (3 variants)
- Team sections (2 variants)
- Footer components (5 variants)
- Stats, Content, Integrations, and more

### Next Steps
1. Make sure the SuperUI API server is running
2. Check the API server configuration
3. Try the request again

**Error Details:** ${error instanceof Error ? error.message : 'Unknown error'}
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


import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { httpClient } from "../utils/http-client.js";

const TOOL_NAME = "get_component_details";
const TOOL_DESCRIPTION = `
Get detailed information about a specific UI component including installation commands, import statements, and usage examples.

**IMPORTANT: This is the second step in the 2-stage component discovery process:**
1. First use list_components to find candidate components
2. Then use this tool to get full installation information

When to use this tool:
- After using list_components to identify a specific component
- When you know the exact component name and need installation instructions
- To get import statements and usage examples
- Before actually installing the component with npx

The tool will return:
- Complete installation command (npx shadcn@latest add ...)
- Installation path information
- Import statement (exact code to import the component)
- Basic usage example (example code)
- Component details (name, package, category, tags)
- Documentation links
- Pro tips and best practices

Example workflow:
1. Call list_components(query="glow button")
2. Review results and choose "glow-button"
3. Call get_component_details(componentName="glow-button")
4. Use the returned installation command to install
5. Copy the import statement and usage example

Supported component names:
- Basic shadcn/ui: button, input, dialog, card, tabs, etc.
- AI components: ai-chat, ai-code-block, ai-message, etc.
- Advanced buttons: glow-button, shimmer-button, magnetic-button, etc.
- Text components: gradient-text, typing-text, counting-number, etc.
`;

interface GetComponentDetailsResponse {
  result: string;
  metadata: {
    componentName: string;
    timestamp: string;
    version: string;
  };
}

export class GetComponentDetailsTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    componentName: z
      .string()
      .describe(
        "Exact component name from list_components (e.g., 'button', 'glow-button', 'ai-chat', 'gradient-text')"
      ),
    absolutePathToCurrentFile: z
      .string()
      .describe(
        "Absolute path to the current file where the component will be used"
      ),
    absolutePathToProjectDirectory: z
      .string()
      .describe("Absolute path to the project root directory"),
  });

  async execute({
    componentName,
    absolutePathToCurrentFile,
    absolutePathToProjectDirectory,
  }: z.infer<typeof this.schema>) {
    try {
      console.log(
        `📦 GetComponentDetailsTool executing for: ${componentName}`
      );
      console.log(`📁 Project: ${absolutePathToProjectDirectory}`);
      console.log(`📄 Current file: ${absolutePathToCurrentFile}`);

      // Call the API server
      const { data } = await httpClient.post<GetComponentDetailsResponse>(
        "/api/component/details",
        {
          componentName,
          absolutePathToCurrentFile,
          absolutePathToProjectDirectory,
        }
      );

      console.log(`✅ Component details retrieved successfully`);

      return {
        content: [
          {
            type: "text" as const,
            text: data.result,
          },
        ],
      };
    } catch (error) {
      console.error("❌ Error executing GetComponentDetailsTool:", error);

      // Provide fallback response if API server is not available
      const fallbackResponse = `
# Component Installation Guide

## Component: ${componentName}

⚠️ **API Server Unavailable**

The SuperUI API server is not responding. Here's a basic installation guide:

### Manual Installation

\`\`\`bash
cd ${absolutePathToProjectDirectory}
npx shadcn@latest add ${componentName}
\`\`\`

### Basic Usage

\`\`\`tsx
import { ${this.capitalizeFirst(componentName)} } from "@/components/ui/${componentName}";

// Use the component in your JSX
<${this.capitalizeFirst(componentName)} />
\`\`\`

### Next Steps

1. Make sure the SuperUI API server is running (http://localhost:3001)
2. Check the API server configuration in your .env file
3. Verify the component name is correct
4. Try the request again

**Error Details:** ${error instanceof Error ? error.message : "Unknown error"}

### Documentation Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components/${componentName})
- [shadcn/ui AI Components](https://www.shadcn.io/ai)
- [shadcn/ui Button Components](https://www.shadcn.io/button)
- [shadcn/ui Text Components](https://www.shadcn.io/text)
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

  /**
   * Capitalize the first letter and convert hyphens to PascalCase
   * @param str - String to capitalize
   * @returns PascalCase string
   */
  private capitalizeFirst(str: string): string {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }
}


import { z } from "zod";
import { BaseTool } from "../utils/base-tool.js";
import { httpClient } from "../utils/http-client.js";

const TOOL_NAME = "list_components";
const TOOL_DESCRIPTION = `
List all available UI components or search/filter them by query.
Returns component names with brief descriptions.

**IMPORTANT: This is the first step in a 2-stage component discovery process:**
1. **First, call this tool WITHOUT query parameter** to see all 79 available components
2. Review the list and choose the appropriate component(s)
3. Then use get_component_details to get full installation information

**RECOMMENDED USAGE:**
- Call \`list_components()\` with NO parameters to see ALL components first
- Optionally use query parameter to filter if needed
- Optionally use category parameter to filter by type

When to use this tool:
- When user asks for UI components (e.g., "I need a button", "show me animated components")
- To see what components are available before choosing
- To explore components by category or feature

## Available Components (79 total)

**Form Components (14):**
button, input, textarea, select, checkbox, radio-group, label, form, switch, slider, combobox, toggle, toggle-group, input-otp

**Layout Components (8):**
card, sheet, dialog, popover, collapsible, resizable, scroll-area, aspect-ratio

**Navigation Components (9):**
tabs, accordion, breadcrumb, navigation-menu, menubar, command, context-menu, dropdown-menu, pagination

**Data Display Components (10):**
table, badge, avatar, progress, skeleton, calendar, date-picker, hover-card, carousel, tooltip

**Feedback Components (4):**
alert, toast, separator, sonner

**AI Components (16) - for chat/AI interfaces:**
ai-actions, ai-branch, ai-code-block, ai-conversation, ai-image, ai-inline-citation, ai-loader, ai-message, ai-prompt-input, ai-reasoning, ai-response, ai-sources, ai-suggestion, ai-task, ai-tool, ai-web-preview

**Advanced Button Components (10) - animated effects:**
glow-button, shimmer-button, magnetic-button, pulse-button, gradient-button, neon-button, shine-button, copy-button, expanding-button, tilt-button

**Text Components (10) - animated text:**
gradient-text, typing-text, shimmering-text, counting-number, sliding-number, rolling-text, rotating-text, splitting-text, highlight-text, writing-text

## Search Query Examples:
- "button" → finds button, glow-button, shimmer-button, etc.
- "animated button" → prioritizes glow-button, shimmer-button, pulse-button
- "chat" → finds ai-conversation, ai-message, ai-prompt-input
- "date" → finds calendar, date-picker
- "text animation" → finds typing-text, gradient-text, shimmering-text
- "glow" → finds glow-button, neon-button
- "input" → finds input, textarea, input-otp, ai-prompt-input

## Categories for filtering:
- form, layout, navigation, data, feedback, ai, advanced-button, text

Example workflow:
1. User: "I need an animated button with glow effect"
2. Call list_components(query="glow button animated")
3. Review candidates: glow-button, neon-button, shimmer-button, etc.
4. Call get_component_details(componentName="glow-button")
5. Install the component using the provided command
`;

interface ListComponentsResponse {
  results: Array<{
    name: string;
    displayName: string;
    description: string;
    category: string;
    library?: string;
  }>;
  metadata: {
    query: string;
    category: string;
    count: number;
    timestamp: string;
    version: string;
  };
}

export class ListComponentsTool extends BaseTool {
  name = TOOL_NAME;
  description = TOOL_DESCRIPTION;

  schema = z.object({
    query: z
      .string()
      .optional()
      .describe(
        "Optional search query to filter components. If empty or not provided, returns ALL 79 components. Examples: 'animated button', 'date picker', 'glow effect', 'chat interface'"
      ),
    category: z
      .string()
      .optional()
      .describe(
        "Optional category filter: form, layout, navigation, data, feedback, ai, advanced-button, text"
      ),
    limit: z
      .number()
      .optional()
      .describe("Maximum number of results to return. If not provided, returns all matching components"),
  });

  async execute({
    query,
    category,
    limit,
  }: z.infer<typeof this.schema>) {
    try {
      console.log(`🔍 ListComponentsTool executing${query ? ` for: ${query}` : ' (all components)'}`);
      if (category) {
        console.log(`📂 Category filter: ${category}`);
      }

      // Call the API server
      const { data } = await httpClient.post<ListComponentsResponse>(
        "/api/component/list",
        {
          query: query || "all",  // If no query, use "all" to get everything
          category,
          limit: limit || 1000,  // Set high limit to get all components
        }
      );

      console.log(`✅ Found ${data.results.length} matching components`);

      // Format response
      const componentsList = data.results
        .map((comp, index) => {
          const libraryBadge = comp.library
            ? ` [${comp.library}]`
            : "";
          return `${index + 1}. **${comp.name}** (${comp.displayName})${libraryBadge}
   - Category: ${comp.category}
   - ${comp.description}`;
        })
        .join("\n\n");

      const queryText = query ? `matching "${query}"` : "(all components)";
      const response = `
# Component Search Results

Found ${data.results.length} component(s) ${queryText}${
        category ? ` in category: ${category}` : ""
      }

${componentsList}

---

## Next Steps

To get full installation instructions for a specific component, use:
\`get_component_details(componentName="component-name-here")\`

For example:
- \`get_component_details(componentName="${data.results[0]?.name || "button"}")\`
      `;

      return {
        content: [
          {
            type: "text" as const,
            text: response,
          },
        ],
      };
    } catch (error) {
      console.error("❌ Error executing ListComponentsTool:", error);

      const fallbackResponse = `
# Component Search Error

⚠️ **API Server Unavailable**

The SuperUI API server is not responding. 

**Error Details:** ${error instanceof Error ? error.message : "Unknown error"}

### Troubleshooting Steps

1. Verify the API server is running (default: http://localhost:3001)
2. Check the API server logs for errors
3. Ensure the MCP server configuration is correct
4. Try restarting the API server

### Manual Alternative

You can search available components manually at:
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
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
}


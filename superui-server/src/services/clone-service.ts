/**
 * Clone service for SuperUI API Server
 * Handles clone frontend requests and orchestrates the cloning workflow
 */

import { captureScreenshot, captureLocalScreenshot, ScreenshotOptions, ScreenshotResult } from "./screenshot-service.js";
import { CLONE_PROMPTS, generateIterationPrompt, COMPLETION_MESSAGE } from "../utils/clone-prompts.js";
import { matchComponentsFromAnalysis } from "../utils/component-matcher.js";
import { ComponentInfo } from "../utils/component-finder.js";

export interface CloneRequest {
  requestType: "initial_analysis" | "component_suggestion" | "compare_screenshots" | "iteration_guide";

  // Screenshot sources
  targetUrl?: string;
  targetScreenshotBase64?: string; // User-provided screenshot
  localUrl?: string; // Current implementation URL (e.g., http://localhost:3000)

  // Analysis context
  targetDescription?: string;
  currentDescription?: string;
  differences?: string[];
  iteration?: number;
  context?: string;

  // Screenshot options
  screenshotOptions?: ScreenshotOptions;
}

export type ScreenshotMetadata = ScreenshotResult["metadata"] | { source: "user-provided" | "provided-or-cached" };

export interface CloneServiceResponse {
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
}

/**
 * Main handler for clone requests
 * Routes to appropriate handler based on request type
 */
export async function handleCloneRequest(request: CloneRequest): Promise<CloneServiceResponse> {
  console.log(`🎨 Handling clone request: ${request.requestType}`);

  switch (request.requestType) {
    case "initial_analysis":
      return await handleInitialAnalysis(request);

    case "component_suggestion":
      return await handleComponentSuggestion(request);

    case "compare_screenshots":
      return await handleCompareScreenshots(request);

    case "iteration_guide":
      return await handleIterationGuide(request);

    default:
      throw new Error(`Unknown request type: ${request.requestType as string}`);
  }
}

/**
 * Handle initial analysis - capture target screenshot and return analysis prompt
 */
async function handleInitialAnalysis(request: CloneRequest): Promise<CloneServiceResponse> {
  let targetScreenshot: string;
  let targetMetadata: ScreenshotMetadata;

  // Get target screenshot
  if (request.targetUrl) {
    console.log(`📸 Capturing target from URL: ${request.targetUrl}`);
    const result = await captureScreenshot(request.targetUrl, request.screenshotOptions);
    targetScreenshot = result.screenshot;
    targetMetadata = result.metadata;
  } else if (request.targetScreenshotBase64) {
    console.log(`📸 Using provided screenshot`);
    targetScreenshot = request.targetScreenshotBase64;
    targetMetadata = { source: "user-provided" };
  } else {
    throw new Error("Either targetUrl or targetScreenshotBase64 is required");
  }

  // Generate analysis prompt
  const text = `
# Target Website Analysis

The target screenshot has been captured and is provided below.

${CLONE_PROMPTS.initialAnalysis}

## Screenshot Metadata

\`\`\`json
${JSON.stringify(targetMetadata, null, 2)}
\`\`\`

## Next Steps

1. Analyze the provided screenshot using your vision capabilities
2. Organize your findings in structured JSON format
3. Call \`requestType: 'component_suggestion'\` with your analysis as \`targetDescription\`

**Ready to analyze the screenshot!**
`;

  return {
    text,
    screenshots: {
      target: {
        data: targetScreenshot,
        mimeType: "image/png",
        metadata: targetMetadata,
      },
    },
  };
}

/**
 * Handle component suggestion based on analysis
 */
async function handleComponentSuggestion(request: CloneRequest): Promise<CloneServiceResponse> {
  if (!request.targetDescription) {
    throw new Error("targetDescription is required for component_suggestion");
  }

  console.log(`🔍 Matching components from analysis...`);

  // Match components based on analysis
  const { components, installations } = await matchComponentsFromAnalysis(request.targetDescription);

  // Generate component list with usage examples
  const componentList = components
    .slice(0, 15) // Limit to top 15 components
    .map(
      (c, i) => `
${i + 1}. **${c.displayName}** (\`${c.componentName}\`)
   - ${c.description}
   - Category: ${c.category}
   - Import: \`${c.importStatement}\`
   - Usage: \`${c.usage}\`
`
    )
    .join("\n");

  const installCommands = installations.slice(0, 15).join("\n");

  const text = `
# Component Recommendations & Implementation Guide

Based on your analysis, here are the recommended components for your implementation.
The components provided here are just for reference, you can use the \`list_components\` tool to find more components.
And if you need more details about a component, you can use the \`get_component_details\` tool to get more details about a component.

**Note:** 
These recommended components are just a starting point based on the analysis.
If you find that your UI requires additional or different components, don't hesitate to explore other options!
Feel free to:
- Search for more components using the \`list_components\` tool
- Request different variants or advanced components if needed
- Combine components in creative ways to best match your design goals

**You are not limited to the options listed below.**
**Actively seek out any other components if needed to achieve the best result!**
**Use your vision capabilities to find the best components for your implementation.**


## 📋 Analysis Summary

${request.targetDescription.substring(0, 600)}${request.targetDescription.length > 600 ? "..." : ""}

## 📦 Recommended Components (${Math.min(components.length, 15)})

${componentList}

## 🚀 Installation Commands

Run these commands in your project directory:

\`\`\`bash
${installCommands}
\`\`\`

## 🎯 Next Steps

1. Install the recommended components using the commands above if needed, or use the \`list_components\` and \`get_component_details\` tools to find more components.
2. Generate your complete implementation based on your analysis
3. Use the component usage examples above as reference
4. Start your local development server (e.g., \`npm run dev\`)
5. Call \`requestType: 'compare_screenshots'\` with \`localUrl\` to compare

**Generate the implementation now!**
`;

  return {
    text,
    components,
    installations,
  };
}

/**
 * Handle screenshot comparison - capture both target and current screenshots
 */
async function handleCompareScreenshots(request: CloneRequest): Promise<CloneServiceResponse> {
  let targetScreenshot: string;
  let targetMetadata: ScreenshotMetadata;

  // Get target screenshot (may reuse from initial analysis)
  if (request.targetUrl) {
    console.log(`📸 Capturing target from URL: ${request.targetUrl}`);
    const result = await captureScreenshot(request.targetUrl, request.screenshotOptions);
    targetScreenshot = result.screenshot;
    targetMetadata = result.metadata;
  } else if (request.targetScreenshotBase64) {
    console.log(`📸 Using provided/cached target screenshot`);
    targetScreenshot = request.targetScreenshotBase64;
    targetMetadata = { source: "provided-or-cached" };
  } else {
    throw new Error("Target screenshot source required (targetUrl or targetScreenshotBase64)");
  }

  // Capture current implementation screenshot
  if (!request.localUrl) {
    throw new Error("localUrl is required to capture current implementation");
  }

  console.log(`📸 Capturing current implementation: ${request.localUrl}`);
  const currentResult = await captureLocalScreenshot(request.localUrl, request.screenshotOptions);

  const iteration = request.iteration || 1;

  const text = `
# Iteration ${iteration}: Screenshot Comparison

Two screenshots are provided below:
1. **Target Screenshot** - The original website to clone
2. **Current Implementation** - Your current work in progress

${CLONE_PROMPTS.styleComparison}

## Screenshot Metadata

### Target
\`\`\`json
${JSON.stringify(targetMetadata, null, 2)}
\`\`\`

### Current Implementation
\`\`\`json
${JSON.stringify(currentResult.metadata, null, 2)}
\`\`\`

## Next Steps

1. Compare both screenshots using your vision capabilities
2. Evaluate each checklist item (✅ Match, ⚠️ Close, ❌ Different)
3. Create a detailed list of differences
4. Call \`requestType: 'iteration_guide'\` with the \`differences\` array

**Ready to compare screenshots!**
`;

  return {
    text,
    screenshots: {
      target: {
        data: targetScreenshot,
        mimeType: "image/png",
        metadata: targetMetadata,
      },
      current: {
        data: currentResult.screenshot,
        mimeType: "image/png",
        metadata: currentResult.metadata,
      },
    },
  };
}

/**
 * Handle iteration guide - provide specific improvement suggestions
 */
async function handleIterationGuide(request: CloneRequest): Promise<CloneServiceResponse> {
  // Check if differences exist
  if (!request.differences || request.differences.length === 0) {
    console.log("✅ No differences found - clone complete!");
    return {
      text: COMPLETION_MESSAGE,
    };
  }

  const iteration = request.iteration || 1;
  console.log(`🔄 Generating iteration ${iteration} guide for ${request.differences.length} differences`);

  // Generate iteration prompt
  const basePrompt = generateIterationPrompt(request.differences, iteration);

  const text = `
${basePrompt}

## 🛠️ Implementation Strategy

### Recommended Order:
1. **Layout fixes first** - Get the structure right
2. **Component adjustments** - Fix sizes, styles, arrangements
3. **Spacing polish** - Fine-tune margins and padding
4. **Content adjustments** - Adjust text content, image positioning, icon placement
5. **Color corrections** - Match the color palette
6. **Typography refinement** - Adjust text sizes and weights
7. **Visual effects** - Adjust shadows, gradients, borders, and opacity
8. **Other adjustments** - Adjust other aspects of the UI to match the target screenshot

### Tips:
- Make one category of changes at a time
- Test after each change
- Use browser DevTools to inspect and compare
- Reference the target screenshot frequently

## 🔄 Next Steps

1. Apply the suggested improvements to your code
2. Save and let your dev server refresh
3. Call \`requestType: 'compare_screenshots'\` again to verify changes
4. Continue iterating until satisfied or differences are minimal

**Iteration ${iteration} complete. Continue improving!**
`;

  // Return a promise for consistency with other async functions and future maintenance
  return Promise.resolve({ text });
}

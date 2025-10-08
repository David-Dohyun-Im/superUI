/**
 * Component service for SuperUI API Server
 * Handles component requests and generates installation instructions
 */

import { 
  findComponent, 
  ComponentInfo, 
  searchComponentsRanked,
  getComponentByName,
  getAllComponents,
  getComponentsByCategory
} from "../utils/component-finder.js";

export interface ComponentRequest {
  message: string;
  searchQuery: string;
  absolutePathToCurrentFile: string;
  absolutePathToProjectDirectory: string;
  standaloneRequestQuery: string;
}

/**
 * Process component request and generate installation guide
 * @param request - Component request from MCP server
 * @returns Formatted installation guide
 */
export async function getComponent(request: ComponentRequest): Promise<string> {
  const { searchQuery, absolutePathToCurrentFile, absolutePathToProjectDirectory } = request;
  
  console.log(`🔍 Processing component request for: ${searchQuery}`);
  
  // Find the component
  const componentInfo = findComponent(searchQuery);
  
  if (!componentInfo) {
    return generateNotFoundResponse(searchQuery, absolutePathToProjectDirectory);
  }
  
  // Generate installation path
  const installPath = determineInstallPath(absolutePathToCurrentFile, absolutePathToProjectDirectory);
  
  // Generate the response
  const result = generateComponentResponse(componentInfo, installPath, absolutePathToProjectDirectory);
  
  console.log(`✅ Component found: ${componentInfo.displayName}`);
  return result;
}

/**
 * Generate response when component is not found
 * @param searchQuery - Original search query
 * @param projectPath - Project root path
 * @returns Not found response
 */
function generateNotFoundResponse(searchQuery: string, projectPath: string): string {
  return `
# Component Not Found

## Search Query: "${searchQuery}"

❌ **Component "${searchQuery}" not found in the SuperUI library.**

### Available Components

Here are some popular components you can try:

#### Form Components
- \`button\` - Button component
- \`input\` - Text input component
- \`textarea\` - Multi-line text input
- \`select\` - Dropdown select component
- \`checkbox\` - Checkbox input
- \`radio-group\` - Radio button group

#### Layout Components
- \`card\` - Content container
- \`sheet\` - Slide-out panel
- \`dialog\` - Modal dialog
- \`popover\` - Floating panel

#### Navigation Components
- \`tabs\` - Tabbed interface
- \`accordion\` - Collapsible content
- \`breadcrumb\` - Navigation breadcrumb

#### Data Display Components
- \`table\` - Data table
- \`badge\` - Status indicator
- \`avatar\` - Profile image
- \`progress\` - Progress bar
- \`skeleton\` - Loading placeholder

#### Feedback Components
- \`alert\` - Alert notification
- \`toast\` - Toast notification
- \`separator\` - Visual separator

### Try Again

Please try with one of the available component names:

\`\`\`bash
cd ${projectPath}
npx shadcn@latest add button
\`\`\`

### Need Help?

If you're looking for a specific component that's not listed above, please:
1. Check the [shadcn/ui documentation](https://ui.shadcn.com/docs/components)
2. Verify the component name spelling
3. Try using a more generic term (e.g., "form" instead of "contact-form")
  `;
}

/**
 * Generate component installation response
 * @param componentInfo - Component information
 * @param installPath - Installation path
 * @param projectPath - Project root path
 * @returns Formatted response
 */
function generateComponentResponse(
  componentInfo: ComponentInfo,
  installPath: string,
  projectPath: string
): string {
  return `
# ${componentInfo.displayName}

${componentInfo.description}

## 📦 Installation

\`\`\`bash
cd ${projectPath}
npx shadcn@latest add ${componentInfo.componentName}
\`\`\`

## 📁 Installation Path

The component will be installed to:
\`${installPath}\`

## 🔧 Import Statement

\`\`\`tsx
${componentInfo.importStatement}
\`\`\`

## 💡 Basic Usage

\`\`\`tsx
${componentInfo.usage}
\`\`\`

## 🏷️ Component Details

- **Name**: ${componentInfo.displayName}
- **Package**: ${componentInfo.packageName}
- **Category**: ${capitalizeFirst(componentInfo.category)}
- **Tags**: ${componentInfo.tags.join(", ")}

## 📚 Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components/${componentInfo.componentName})
- [Radix UI Documentation](https://www.radix-ui.com/primitives)

## 🚀 Next Steps

1. Run the installation command above
2. Import the component in your file
3. Use the component as shown in the usage example
4. Customize the component with additional props and styling

## 💡 Pro Tips

- Check the component's props in the documentation for customization options
- Use Tailwind CSS classes for styling
- Consider using the component's variants (e.g., \`variant="outline"\` for buttons)
- Test the component in different states (loading, disabled, etc.)
  `;
}

/**
 * Determine the installation path based on current file location
 * @param currentFile - Current file path
 * @param projectPath - Project root path
 * @returns Installation path
 */
function determineInstallPath(currentFile: string, projectPath: string): string {
  // Default shadcn/ui installation path
  const defaultPath = "src/components/ui";
  
  // Try to determine if we're in a specific components directory
  const relativePath = currentFile.replace(projectPath, "").toLowerCase();
  
  if (relativePath.includes("/components/")) {
    // Extract the components directory structure
    const pathParts = relativePath.split("/");
    const componentsIndex = pathParts.findIndex(part => part === "components");
    
    if (componentsIndex !== -1 && componentsIndex < pathParts.length - 1) {
      const componentsPath = pathParts.slice(0, componentsIndex + 1).join("/");
      return `${componentsPath}/ui`;
    }
  }
  
  // Check common project structures
  if (relativePath.includes("/src/")) {
    return "src/components/ui";
  }
  
  if (relativePath.includes("/app/")) {
    return "app/components/ui";
  }
  
  if (relativePath.includes("/lib/")) {
    return "lib/components/ui";
  }
  
  // Default fallback
  return defaultPath;
}

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * List components based on search query
 * Returns brief component information for candidate selection
 * @param request - List request with query, category filter, and limit
 * @returns Array of component summaries
 */
export interface ListComponentsRequest {
  query: string;
  category?: string;
  limit?: number;
}

export interface ComponentSummary {
  name: string;
  displayName: string;
  description: string;
  category: string;
  library?: string;
}

export async function listComponents(
  request: ListComponentsRequest
): Promise<ComponentSummary[]> {
  const { query, category, limit } = request;
  
  console.log(`🔍 Listing components for query: "${query}"${category ? ` in category: ${category}` : ''}`);
  
  let components: ComponentInfo[];
  
  // If query is "all" or empty, return all components
  if (!query || query.toLowerCase() === "all") {
    console.log(`📋 Returning all components`);
    components = category 
      ? getComponentsByCategory(category)
      : getAllComponents();
    
    // Apply limit if provided
    if (limit && limit > 0) {
      components = components.slice(0, limit);
    }
  } else {
    // Use ranked search for specific queries
    components = searchComponentsRanked(query, category, limit || 100);
  }
  
  console.log(`✅ Found ${components.length} matching components`);
  
  // Return simplified summaries
  return components.map(component => ({
    name: component.componentName,
    displayName: component.displayName,
    description: component.description,
    category: component.category,
    library: component.library
  }));
}

/**
 * Get detailed component information for installation
 * @param request - Component details request
 * @returns Formatted installation guide
 */
export interface ComponentDetailsRequest {
  componentName: string;
  absolutePathToCurrentFile: string;
  absolutePathToProjectDirectory: string;
}

export async function getComponentDetails(
  request: ComponentDetailsRequest
): Promise<string> {
  const { componentName, absolutePathToCurrentFile, absolutePathToProjectDirectory } = request;
  
  console.log(`📦 Getting details for component: ${componentName}`);
  
  // Get component by exact name
  const componentInfo = getComponentByName(componentName);
  
  if (!componentInfo) {
    return generateNotFoundResponse(componentName, absolutePathToProjectDirectory);
  }
  
  // Generate installation path
  const installPath = determineInstallPath(absolutePathToCurrentFile, absolutePathToProjectDirectory);
  
  // Generate detailed response
  const result = generateDetailedComponentResponse(
    componentInfo,
    installPath,
    absolutePathToProjectDirectory
  );
  
  console.log(`✅ Component details generated: ${componentInfo.displayName}`);
  return result;
}

/**
 * Generate detailed component response with installation guide
 * @param componentInfo - Component information
 * @param installPath - Installation path
 * @param projectPath - Project root path
 * @returns Formatted detailed response
 */
function generateDetailedComponentResponse(
  componentInfo: ComponentInfo,
  installPath: string,
  projectPath: string
): string {
  // Determine installation command
  const installCommand = componentInfo.installCommand || 
    `npx shadcn@latest add ${componentInfo.componentName}`;
  
  // Build documentation link
  const docUrl = componentInfo.documentationUrl || 
    `https://ui.shadcn.com/docs/components/${componentInfo.componentName}`;
  
  let response = `
# ${componentInfo.displayName}

${componentInfo.description}

## 📦 Installation

\`\`\`bash
cd ${projectPath}
${installCommand}
\`\`\`

## 📁 Installation Path

The component will be installed to:
\`${installPath}\`

## 🔧 Import Statement

\`\`\`tsx
${componentInfo.importStatement}
\`\`\`

## 💡 Basic Usage

\`\`\`tsx
${componentInfo.usage}
\`\`\`

## 🏷️ Component Details

- **Name**: ${componentInfo.displayName}
- **Package**: ${componentInfo.packageName}
- **Category**: ${capitalizeFirst(componentInfo.category)}
- **Tags**: ${componentInfo.tags.join(", ")}
`;

  // Add library info if it's an extended component
  if (componentInfo.library && componentInfo.library !== "shadcn-ui") {
    response += `- **Library**: ${componentInfo.library}\n`;
  }

  response += `
## 📚 Additional Resources

- [Documentation](${docUrl})
`;

  // Add specific documentation for extended libraries
  if (componentInfo.library === "shadcn-ai") {
    response += `- [AI Components Collection](https://www.shadcn.io/ai)\n`;
  } else if (componentInfo.library === "shadcn-button") {
    response += `- [Button Components Collection](https://www.shadcn.io/button)\n`;
  } else if (componentInfo.library === "shadcn-text") {
    response += `- [Text Components Collection](https://www.shadcn.io/text)\n`;
  } else {
    response += `- [shadcn/ui Documentation](https://ui.shadcn.com/docs/components)
- [Radix UI Documentation](https://www.radix-ui.com/primitives)
`;
  }

  response += `
## 🚀 Next Steps

1. Run the installation command above
2. Import the component in your file
3. Use the component as shown in the usage example
4. Customize the component with additional props and styling

## 💡 Pro Tips

- Check the component's props in the documentation for customization options
- Use Tailwind CSS classes for styling
`;

  // Add category-specific tips
  if (componentInfo.category === "ai") {
    response += `- These AI components are designed for chat and conversational interfaces
- Consider streaming responses for better UX
- Integrate with AI SDKs like Vercel AI SDK or LangChain
`;
  } else if (componentInfo.category === "advanced-button") {
    response += `- These buttons include advanced animations and effects
- Test performance on lower-end devices
- Consider using reduced-motion queries for accessibility
`;
  } else if (componentInfo.category === "text") {
    response += `- These text components include animations that may need performance tuning
- Test readability and accessibility with screen readers
- Consider animation timing based on text length
`;
  } else {
    response += `- Consider using the component's variants (e.g., \`variant="outline"\` for buttons)
- Test the component in different states (loading, disabled, error, etc.)
`;
  }

  return response;
}

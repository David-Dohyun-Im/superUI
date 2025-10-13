/**
 * Component matching utility for clone frontend
 * Matches visual patterns to shadcn/ui components
 */

import { ComponentInfo, getComponentByName } from "./component-finder.js";

export interface VisualPattern {
  keywords: string[];
  components: string[];
  priority: number;
}

/**
 * Visual pattern to component mapping
 * Based on common web design patterns
 */
export const VISUAL_PATTERNS: Record<string, VisualPattern> = {
  hero: {
    keywords: ["hero", "banner", "jumbotron", "large heading", "main heading", "hero section", "landing header", "above the fold", "headline"],
    components: ["card", "button", "gradient-text", "glow-button", "gradient-button"],
    priority: 10,
  },

  navigation: {
    keywords: ["navigation", "navbar", "nav bar", "menu", "header", "nav links", "top menu", "navigation bar", "site navigation", "main nav"],
    components: ["navigation-menu", "menubar", "tabs", "breadcrumb", "dropdown-menu"],
    priority: 9,
  },

  features: {
    keywords: [
      "features",
      "feature grid",
      "benefits",
      "three columns",
      "3 columns",
      "icon grid",
      "feature cards",
      "feature list",
      "key features",
      "highlights",
    ],
    components: ["card", "badge", "avatar", "separator"],
    priority: 8,
  },

  form: {
    keywords: ["form", "input", "contact form", "signup", "sign up", "login", "text field", "input field", "form field", "contact", "subscribe"],
    components: ["form", "input", "textarea", "button", "select", "checkbox", "label"],
    priority: 8,
  },

  pricing: {
    keywords: ["pricing", "plans", "tiers", "subscription", "price table", "pricing table", "pricing cards", "plan options", "packages"],
    components: ["card", "badge", "button", "separator", "switch", "toggle"],
    priority: 7,
  },

  testimonials: {
    keywords: ["testimonials", "reviews", "quotes", "feedback", "customer stories", "testimonial", "review", "customer feedback", "user reviews", "ratings"],
    components: ["card", "avatar", "carousel", "badge"],
    priority: 7,
  },

  cta: {
    keywords: ["call to action", "cta", "sign up", "get started", "try now", "action button", "primary button", "start free trial", "download"],
    components: ["button", "glow-button", "gradient-button", "shimmer-button"],
    priority: 9,
  },

  stats: {
    keywords: ["statistics", "stats", "numbers", "metrics", "counter", "achievements", "key numbers", "data", "analytics"],
    components: ["card", "counting-number", "sliding-number", "badge", "progress"],
    priority: 6,
  },

  gallery: {
    keywords: ["gallery", "images", "portfolio", "showcase", "image grid", "photo gallery", "image showcase", "work samples"],
    components: ["carousel", "card", "aspect-ratio", "dialog"],
    priority: 6,
  },

  faq: {
    keywords: ["faq", "questions", "accordion", "collapsible", "q&a", "frequently asked", "help", "support"],
    components: ["accordion", "collapsible", "card"],
    priority: 5,
  },

  footer: {
    keywords: ["footer", "site footer", "bottom", "copyright", "links footer", "footer links", "social links"],
    components: ["separator", "button", "navigation-menu"],
    priority: 4,
  },

  table: {
    keywords: ["table", "data table", "grid", "rows", "columns", "comparison table", "feature comparison"],
    components: ["table", "badge", "checkbox"],
    priority: 6,
  },

  tabs: {
    keywords: ["tabs", "tabbed", "tab navigation", "tab panel", "switch between", "toggle views"],
    components: ["tabs", "toggle-group"],
    priority: 7,
  },
};

/**
 * Match components from analysis text
 * @param analysis - LLM's analysis of the target screenshot
 * @returns Matched components and installation commands
 */
export async function matchComponentsFromAnalysis(analysis: string): Promise<{
  components: ComponentInfo[];
  installations: string[];
}> {
  const lowerAnalysis = analysis.toLowerCase();
  const matchedComponents = new Set<string>();
  const priorities: Record<string, number> = {};

  console.log("🔍 Matching visual patterns...");

  // Pattern matching
  for (const [patternName, pattern] of Object.entries(VISUAL_PATTERNS)) {
    for (const keyword of pattern.keywords) {
      if (lowerAnalysis.includes(keyword)) {
        console.log(`✓ Matched pattern: ${patternName} (keyword: "${keyword}")`);

        // Add all components for this pattern
        pattern.components.forEach((comp) => {
          matchedComponents.add(comp);
          // Keep highest priority for each component
          priorities[comp] = Math.max(priorities[comp] || 0, pattern.priority);
        });

        break; // Found keyword, no need to check others for this pattern
      }
    }
  }

  // Add basic components if nothing matched
  if (matchedComponents.size === 0) {
    console.log("⚠️ No patterns matched, adding default components");
    ["button", "card", "input"].forEach((comp) => {
      matchedComponents.add(comp);
      priorities[comp] = 5;
    });
  }

  // Get component information
  const components: ComponentInfo[] = [];
  for (const componentName of matchedComponents) {
    const comp = getComponentByName(componentName);
    if (comp) {
      components.push(comp);
    }
  }

  // Sort by priority (highest first)
  components.sort((a, b) => (priorities[b.componentName] || 0) - (priorities[a.componentName] || 0));

  console.log(`✅ Matched ${components.length} components`);

  // Generate installation commands
  const installations = components.map(
    (c) => c.installCommand || `Install command for '${c.componentName}' component not found. Try installing it by yourself.`
  );

  // Return a promise for consistency with other async functions and future maintenance
  return Promise.resolve({ components, installations });
}

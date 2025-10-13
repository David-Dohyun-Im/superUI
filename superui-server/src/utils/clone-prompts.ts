/**
 * Prompts and guides for clone frontend workflow
 */

export const CLONE_PROMPTS = {
  /**
   * Initial analysis prompt for target website
   */
  initialAnalysis: `
# Website UI Analysis Guide

Analyze the provided screenshot from the following perspectives:

## 1. Overall Layout Structure
- [ ] Header presence and structure (height, background, fixed/sticky)
- [ ] Main content area layout (columns, width, container)
- [ ] Sidebar presence and position (left/right)
- [ ] Footer presence and structure
- [ ] Overall width (full-width vs contained/max-width)
- [ ] Scrolling behavior

## 2. Sections Breakdown
List each section in order and describe:
- Section type (Hero, Features, Pricing, Testimonials, CTA, etc.)
- Section height and background
- Internal component composition
- Content alignment

## 3. Key Components
Identify each component:
- Type (Button, Card, Form, Image, Icon, Badge, etc.)
- Size and proportions
- Style characteristics (rounded, shadow, border)
- Interactive states (if visible)

## 4. Spacing and Padding
- Section spacing (vertical gaps between sections)
- Component internal padding
- Margins between elements
- Grid gaps (if grid layout)

## 5. Content
- Text content
- Image content
- Icon content
- Badge content
- Separator content
- Link content

## 6. Color Palette
Extract colors (hex estimates):
- Background colors (primary, secondary)
- Text colors (headings, body, muted)
- Accent/brand colors
- Border colors
- Hover/active state colors (if visible)

## 7. Typography
- Heading sizes (h1, h2, h3)
- Body text size
- Font weights (light, normal, medium, semibold, bold)
- Line heights
- Letter spacing

## 8. Visual Effects
- Shadows (box-shadow, text-shadow)
- Gradients (linear, radial)
- Border radius (rounded corners)
- Hover effects (estimated)
- Animations (estimated)

## 9. Responsive Indicators
- Mobile-specific patterns (hamburger menu, etc.)
- Breakpoint behaviors (visible in screenshot)

## 10. Other
- Other elements (if any)

---

**Output Format:**
Provide your analysis in structured JSON format with clear categorization.
`,

  /**
   * Style comparison checklist for comparing target vs current implementation
   */
  styleComparison: `
# Screenshot Comparison Checklist

Compare the two screenshots (Target vs Current Implementation) using the following criteria:

## Layout Comparison
- [ ] Overall width/height match
- [ ] Section placement and order
- [ ] Grid/flex structure consistency
- [ ] Alignment (left/center/right) match
- [ ] Container widths match
- [ ] Spacing between sections match

## Component Comparison
- [ ] Button size/style match
- [ ] Card design consistency
- [ ] Image sizes/ratios match
- [ ] Icon presence and style
- [ ] Form element styling
- [ ] Navigation structure match

## Spacing Comparison
- [ ] Section vertical spacing match
- [ ] Component padding match
- [ ] Element margins match
- [ ] Grid/flex gaps match

## Content Comparison
- [ ] Text content match
- [ ] Image content match
- [ ] Icon content match
- [ ] Badge content match
- [ ] Separator content match
- [ ] Link content match

## Color Comparison
- [ ] Background colors match
- [ ] Text colors match (headings, body)
- [ ] Accent colors match
- [ ] Border colors match
- [ ] Gradient directions and colors

## Typography Comparison
- [ ] Heading sizes match (h1, h2, h3)
- [ ] Body text size match
- [ ] Font weights match
- [ ] Line heights match
- [ ] Letter spacing match

## Visual Effects Comparison
- [ ] Shadow depths match
- [ ] Border radius match
- [ ] Gradient effects match
- [ ] Opacity/transparency match

## Responsive Comparison
- [ ] Mobile-specific patterns match
- [ ] Breakpoint behaviors match

## Other Comparison
- [ ] Other elements match

---

**Evaluation Scale:**
For each item, rate as:
- ✅ **Match** - Identical or nearly identical
- ⚠️ **Close** - Similar but needs minor adjustment (describe difference)
- ❌ **Different** - Significant difference (describe in detail)

**Output Format:**
List all items with their ratings and detailed descriptions of any differences.
`,
};

/**
 * Generate iteration guide prompt based on differences
 */
export function generateIterationPrompt(differences: string[], iteration: number): string {
  return `
# Iteration ${iteration}: Improvement Guide

## 🔍 Identified Differences (${differences.length} items)

${differences.map((diff, i) => `${i + 1}. ${diff}`).join("\n")}

## 🎯 Priority-Based Improvements

The differences have been categorized below by priority and type.
Focus on high-impact changes first.

### Priority Levels:
- **P0 (Critical)**: Major layout issues, completely wrong structure
- **P1 (High)**: Significant visual differences, wrong colors
- **P2 (Medium)**: Minor spacing, sizing issues
- **P3 (Low)**: Fine-tuning, subtle adjustments

## 🔄 Next Steps

1. Apply the suggested adjustments to your code
2. Run \`requestType: 'compare_screenshots'\` again to verify
3. If satisfactory, you're done! Otherwise, continue to next iteration

**Current Progress: Iteration ${iteration}**
`;
}

/**
 * Completion message when no differences found
 */
export const COMPLETION_MESSAGE = `
# 🎉 Clone Complete!

No significant differences detected between target and current implementation.
Your clone is sufficiently similar to the target website!

## Final Checklist

Before finishing, verify:
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Dark mode support (if needed)
- [ ] Accessibility checks (ARIA labels, keyboard navigation)
- [ ] Performance optimization (image loading, bundle size)
- [ ] Code cleanup and comments

**Congratulations! Your frontend clone is complete.** 🎊
`;

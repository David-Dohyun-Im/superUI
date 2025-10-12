/**
 * Prompts and guides for clone frontend workflow
 */

export const CLONE_PROMPTS = {
  /**
   * Initial analysis prompt for target website
   */
  initialAnalysis: "",

  /**
   * Style comparison checklist for comparing target vs current implementation
   */
  styleComparison: "",

  /**
   * Comparison checklist as structured object
   */
  comparisonChecklist: {
    layout: [],
    components: [],
    colors: [],
    typography: [],
    spacing: [],
    effects: [],
  },
};

/**
 * Generate iteration guide prompt based on differences
 */
export function generateIterationPrompt(differences: string[], iteration: number): string {
  return "";
}

/**
 * Completion message when no differences found
 */
export const COMPLETION_MESSAGE = "";

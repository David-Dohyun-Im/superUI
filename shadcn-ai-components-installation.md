# shadcn.io AI Components Installation Guide

This document contains the installation methods for all AI components from shadcn.io/ai.

## Installation Methods

All AI components use the same installation method with different registry URLs:

### npm
```bash
npx shadcn@latest add https://www.shadcn.io/registry/ai.json
```

### yarn
```bash
npx shadcn@latest add https://www.shadcn.io/registry/ai.json
```

### pnpm
```bash
pnpm dlx shadcn@latest add https://www.shadcn.io/registry/ai.json
```

### bun
```bash
bunx shadcn@latest add https://www.shadcn.io/registry/ai.json
```

## AI Components List

Based on the shadcn.io/ai website, here are all available AI components:

### Core AI Components

1. **ai-actions** - Interactive AI action buttons for React chat interfaces
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { Actions, Action } from "@/components/ai/actions";`

2. **ai-branch** - Branch between AI response variations like ChatGPT
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { Branch } from "@/components/ai/branch";`

3. **ai-code-block** - Code block display for AI responses
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { CodeBlock } from "@/components/ai/code-block";`

4. **ai-conversation** - Auto-scrolling chat containers for AI chat applications
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { Conversation, ConversationContent } from "@/components/ai/conversation";`

5. **ai-image** - Image display for AI responses
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { Image } from "@/components/ai/image";`

6. **ai-inline-citation** - Inline citations for AI responses
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { InlineCitation } from "@/components/ai/inline-citation";`

7. **ai-loader** - Loading spinners for AI operations and streaming states
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { Loader } from "@/components/ai/loader";`

8. **ai-message** - Chat message containers with role-based styling for AI responses
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { Message, MessageContent } from "@/components/ai/message";`

9. **ai-prompt-input** - Auto-resizing textarea with toolbar for conversational AI
   - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
   - Usage: `import { PromptInput } from "@/components/ai/prompt-input";`

10. **ai-reasoning** - Collapsible AI reasoning display with auto-streaming behavior
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { Reasoning } from "@/components/ai/reasoning";`

11. **ai-response** - Streaming-optimized markdown renderer for AI-generated content
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { Response } from "@/components/ai/response";`

12. **ai-sources** - Collapsible source citations for AI-generated content
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { Sources } from "@/components/ai/sources";`

13. **ai-suggestion** - Scrollable suggestion pills for quick AI prompts
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { Suggestion } from "@/components/ai/suggestion";`

14. **ai-task** - Collapsible task lists with file references and progress tracking
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { Task } from "@/components/ai/task";`

15. **ai-tool** - Collapsible tool execution display with status tracking
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { Tool } from "@/components/ai/tool";`

16. **ai-web-preview** - Web preview for AI responses
    - Installation: `npx shadcn@latest add https://www.shadcn.io/registry/ai.json`
    - Usage: `import { WebPreview } from "@/components/ai/web-preview";`

## Key Differences from Standard shadcn/ui

1. **Registry URL**: Uses `https://www.shadcn.io/registry/ai.json` instead of default registry
2. **Import Path**: All components are imported from `@/components/ai/[component-name]`
3. **Dependencies**: Requires Vercel AI SDK for full functionality
4. **Usage Pattern**: Designed specifically for conversational AI interfaces

## Integration with Vercel AI SDK

All AI components are designed to work seamlessly with the Vercel AI SDK:

```typescript
import { useChat } from "@ai-sdk/react";
import { Message, MessageContent } from "@/components/ai/message";
import { Response } from "@/components/ai/response";
import { Actions, Action } from "@/components/ai/actions";

export default function Chat() {
  const { messages } = useChat();

  return (
    <div>
      {messages.map((message) => (
        <Message from={message.role} key={message.id}>
          <MessageContent>
            <Response>{message.content}</Response>
            <Actions>
              <Action label="Copy">Copy</Action>
            </Actions>
          </MessageContent>
        </Message>
      ))}
    </div>
  );
}
```

## Notes

- All AI components use the same installation command
- Components are designed to work together as a cohesive system
- Built on shadcn/ui principles with full TypeScript support
- Optimized for streaming responses and conversational AI patterns
- Free and open source with complete code ownership

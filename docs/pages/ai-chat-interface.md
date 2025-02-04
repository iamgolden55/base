# AI Chat Interface Documentation

## Overview
The AI Chat Interface is a modern, responsive chat interface designed for health-related conversations. It provides real-time interaction with an AI assistant, featuring rich text formatting, message actions, typing indicators, and auto-scrolling capabilities.

## Component Structure

### Main Components
1. **AIChatInterface**
   - Primary component handling the chat functionality
   - Manages message state and user interactions
   - Implements auto-scrolling behavior
   - Renders rich text formatting

2. **LoadingDots**
   - Animated loading indicator
   - Shows when AI is processing a response
   - Uses Framer Motion for smooth animations

3. **ReactMarkdown**
   - Handles rich text formatting
   - Supports multiple content types
   - Custom styled components

## Message Actions

### Copy Function
```typescript
const stripMarkdown = (markdown: string) => {
  // Strips markdown formatting for clean copying
  return markdown
    .replace(/#{1,6} /g, '')           // Headers
    .replace(/\*\*/g, '')              // Bold
    .replace(/\*/g, '')                // Italic
    // ... other replacements
    .trim();
};
```

### Message Actions
1. **Copy Message**
   - Strips markdown formatting
   - Copies clean text to clipboard
   - Shows success animation
   - Displays toast notification

2. **Regenerate Response**
   - Regenerates AI response
   - Maintains context
   - Shows loading state
   - Updates message thread

3. **Feedback System**
   - Positive/negative feedback
   - Visual feedback confirmation
   - Analytics tracking (TODO)
   - User engagement metrics (TODO)

## TODOs and Implementation Guide

### 1. Feedback Analytics
```typescript
interface FeedbackData {
  messageId: string;
  type: 'positive' | 'negative';
  userId: string;
  timestamp: Date;
  context?: string;
}

// Implementation steps:
// 1. Create feedback database table
// 2. Add API endpoint for feedback
// 3. Implement analytics dashboard
// 4. Add feedback trends reporting
```

### 2. Response Regeneration
```typescript
interface RegenerationConfig {
  messageId: string;
  previousContext: string[];
  temperature?: number;
  maxTokens?: number;
}

// Implementation steps:
// 1. Add context preservation
// 2. Implement retry logic
// 3. Add variation parameters
// 4. Handle rate limiting
```

### 3. Enhanced Copy Features
```typescript
// Future enhancements:
// 1. Format preservation options
// 2. Partial message selection
// 3. Multiple format export (MD/Text)
// 4. Share functionality
```

### 4. Message Threading
```typescript
interface MessageThread {
  id: string;
  messages: Message[];
  context: string;
  metadata: ThreadMetadata;
}

// Implementation steps:
// 1. Add thread management
// 2. Implement context windows
// 3. Add thread persistence
// 4. Enable thread sharing
```

## Rich Text Formatting

### Supported Formats
```typescript
// Markdown Components Configuration
{
  // Headers
  h1: "text-xl font-semibold my-4",
  h2: "text-lg font-semibold my-3",
  h3: "text-md font-semibold my-2",
  
  // Lists
  ul: "list-disc ml-4 my-2 space-y-1",
  ol: "list-decimal ml-4 my-2 space-y-1",
  
  // Code
  code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
  pre: "bg-muted p-4 rounded-lg my-2 overflow-x-auto",
  
  // Text Elements
  p: "my-2 leading-relaxed",
  blockquote: "border-l-4 pl-4 my-2 italic",
  
  // Links
  a: "text-primary hover:underline"
}
```

### Example Usage
```markdown
# Main Topic
## Subtopic

1. First point
2. Second point
   - Subpoint A
   - Subpoint B

`inline code`

```code
block of code
```

> Important note
```

## Message Handling
```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  images?: string[];
}
```

## Dependencies
- **Framer Motion**: Animation library
- **Lucide React**: Icon components
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **react-markdown**: Markdown parsing
- **remark-gfm**: GitHub Flavored Markdown support

## Styling

### Message Bubbles
- User messages: Right-aligned with primary color background
- AI responses: Left-aligned with blockquote styling and rich text support
- Responsive width adjustments for different screen sizes

### Layout
```css
/* Container */
.chat-container {
  min-height: calc(100vh-4rem);
  width: 100%;
}

/* Messages Area */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

/* Input Section */
.input-section {
  position: sticky;
  bottom: 0;
  border-top: 1px solid;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
}
```

## Best Practices
1. **Content Formatting**
   - Use appropriate heading levels
   - Keep lists concise and structured
   - Use code blocks for technical content
   - Maintain consistent spacing

2. **Performance**
   - Optimize markdown rendering
   - Use virtualization for large message lists
   - Implement debouncing for input handling

3. **Accessibility**
   - Proper heading hierarchy
   - Semantic HTML through markdown
   - Screen reader compatibility
   - Keyboard navigation for actions

4. **Error Handling**
   - Graceful fallbacks
   - User feedback
   - Retry mechanisms
   - Error boundaries

## Security Considerations
1. Markdown sanitization
2. Link validation
3. Content filtering
4. XSS prevention
5. Input sanitization
6. Rate limiting
7. User authentication
8. Action validation

## Future Enhancements
1. Code syntax highlighting
2. Table support with sorting
3. Image markdown support
4. Custom emoji support
5. Math equation rendering
6. Thread export functionality
7. Advanced analytics
8. Collaborative features

## Contributing
When contributing to this component:
1. Follow the existing code style
2. Test markdown rendering
3. Update documentation
4. Verify accessibility
5. Test across different devices
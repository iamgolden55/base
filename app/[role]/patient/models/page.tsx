'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { SuggestionButton } from "@/components/ui/suggestion-button";
import { Loader2, ArrowUp, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Spinner } from "@nextui-org/spinner";
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  images?: string[];
  text: string;
  sender: 'user' | 'assistant';
}

// Animated loading indicator component for AI thinking state
const LoadingDots = () => (
  <div className="flex items-center gap-1">
    {/* First dot with animation */}
    <motion.span
      className="h-1.5 w-1.5 bg-primary/40 rounded-full"
      animate={{ scale: [1, 1.2, 1] }} // Pulsing animation sequence
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }} // Continuous animation with delay
    />
    {/* Second dot with delayed animation */}
    <motion.span
      className="h-1.5 w-1.5 bg-primary/40 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2, delay: 0.2 }} // Slight delay for wave effect
    />
    {/* Third dot with further delayed animation */}
    <motion.span
      className="h-1.5 w-1.5 bg-primary/40 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2, delay: 0.4 }}
    />
  </div>
);

// Add this utility function to strip markdown
const stripMarkdown = (markdown: string) => {
  return markdown
    .replace(/#{1,6} /g, '')           // Remove headers
    .replace(/\*\*/g, '')              // Remove bold
    .replace(/\*/g, '')                // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // Replace links with text
    .replace(/`{3}[\s\S]*?`{3}/g, '')  // Remove code blocks
    .replace(/`/g, '')                 // Remove inline code
    .replace(/\n\s*[-*+]\s/g, '\n• ')  // Convert list items to bullets
    .replace(/\n\s*\d+\.\s/g, '\n• ')  // Convert numbered lists to bullets
    .replace(/>\s/g, '')               // Remove blockquotes
    .trim();
};

// Main chat interface component
export default function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [showPrompts, setShowPrompts] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({});
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'positive' | 'negative' | null>>({});
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>;
  }

  // Function to smoothly scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll effect when messages array updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      text: inputMessage,
      sender: 'user',
    };

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');

      // TODO: Implement API call to AI service
      // const response = await axios.post('/api/chat', { message: inputMessage });
      
      // Simulate AI response for now
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `# Welcome to the Public Health Bureau

## About Our Platform
The Public Health Bureau (PHB) represents a transformative initiative in healthcare technology. Here's what we offer:

### Key Features
1. Advanced AI Integration
2. Real-time Health Monitoring
3. Personalized Care Plans

### How It Works
- Connect with healthcare providers
- Access your medical records
- Schedule appointments easily

## Technical Capabilities
\`\`\`typescript
interface HealthSystem {
  ai: AdvancedAI;
  monitoring: RealTime;
  records: SecureStorage;
}
\`\`\`

> Important: Your health data is always encrypted and secure.

For more information, visit our [documentation](https://docs.example.com).`,
        role: 'assistant',
        timestamp: new Date(),
        text: `# Welcome to the Public Health Bureau

## About Our Platform
The Public Health Bureau (PHB) represents a transformative initiative in healthcare technology. Here's what we offer:

### Key Features
1. Advanced AI Integration
2. Real-time Health Monitoring
3. Personalized Care Plans

### How It Works
- Connect with healthcare providers
- Access your medical records
- Schedule appointments easily

## Technical Capabilities
\`\`\`typescript
interface HealthSystem {
  ai: AdvancedAI;
  monitoring: RealTime;
  records: SecureStorage;
}
\`\`\`

> Important: Your health data is always encrypted and secure.

For more information, visit our [documentation](https://docs.example.com).`,
        sender: 'assistant',
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (suggestion: string) => {
    // Implementation of handlePromptClick
  };

  const handleRegenerateResponse = async (message: Message) => {
    setIsLoading(true);
    try {
      // TODO: Implement your regeneration logic here
      const aiResponse = { ...message, id: Date.now().toString() };
      setMessages(prev => [...prev.slice(0, -1), aiResponse]);
      toast({
        description: "Response regenerated",
        duration: 2000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to regenerate response",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, type: 'positive' | 'negative') => {
    try {
      // TODO: Implement feedback logic here
      toast({
        description: `${type === 'positive' ? 'Positive' : 'Negative'} feedback recorded`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to record feedback",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
      {/* Header section */}
      <div className="px-2 md:px-8 lg:px-8 py-2 w-full max-w-[85rem] mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium">AI Health Assistant</h1>
        <p className="text-muted-foreground text-sm">Get personalized health guidance</p>
      </div>

      {/* Main chat container */}
      <Card className="flex-1 flex flex-col w-full max-w-[85rem] mx-auto rounded-none md:rounded-lg relative bg-background/50 backdrop-blur-sm">
        {showPrompts && (
          <motion.div
            className="flex flex-wrap gap-2 mb-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {suggestions.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                icon={Sparkles}
                onClick={() => handlePromptClick(suggestion)}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </motion.div>
        )}

        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Map through and render messages */}
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={cn("flex gap-2 mb-6", 
                message.sender === "user" ? "justify-end" : "justify-start items-start"
              )}
            >
              {message.sender === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[85%] md:max-w-[75%] text-sm",
                  message.sender === "user" 
                    ? "bg-black/20 text-black/90 rounded-2xl rounded-br-md px-4 py-2.5 text-6l font-light tracking-tight"
                    : "text-foreground/90 pl-4 border-l-2 border-primary/20 font-light"
                )}
              >
                {message.sender === "assistant" ? (
                  
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => <h1 className="text-xl font-semibold my-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-lg font-semibold my-3">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-md font-semibold my-2">{children}</h3>,
                        ul: ({ children }) => <ul className="list-disc ml-4 my-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-4 my-2 space-y-1">{children}</ol>,
                        p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ node, inline, className, children, ...props }: any) => {
                          if (inline) {
                            return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>;
                          }
                          return <pre className="bg-muted p-4 rounded-lg my-2 overflow-x-auto font-mono" {...props}>{children}</pre>;
                        },
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full divide-y divide-border">{children}</table>
                          </div>
                        ),
                        a: ({ href, children }) => (
                          <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  
                ) : (
                  message.text
                )}
                <div className={cn(
                  "text-[10px] mt-1",
                  message.sender === "user" 
                    ? "opacity-70" 
                    : "text-muted-foreground/60"
                )}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </div>

                {/* Action Icons */}
                {message.sender === "assistant" && (
                  <div className="flex gap-2 mt-2">
                    <motion.button
                      onClick={() => {
                        const cleanText = stripMarkdown(message.text);
                        
                        navigator.clipboard.writeText(cleanText);
                        setCopiedMap(prev => ({ ...prev, [message.id]: true }));
                        setTimeout(() => {
                          setCopiedMap(prev => ({ ...prev, [message.id]: false }));
                        }, 2000);
                        toast({
                          description: "Message copied to clipboard",
                          duration: 2000,
                        });
                      }}
                      className={cn(
                        "p-1 hover:bg-muted rounded-md transition-colors",
                        copiedMap[message.id] 
                          ? "text-green-500" 
                          : "text-muted-foreground"
                      )}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Copy 
                        className={cn(
                          "h-3 w-3 transition-colors duration-200",
                          copiedMap[message.id] 
                            ? "text-green-500" 
                            : "text-muted-foreground"
                        )}
                      />
                    </motion.button>
                    <button
                      onClick={() => handleRegenerateResponse(message)}
                      className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                      <RefreshCw className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => {
                        handleFeedback(message.id, 'positive');
                        setFeedbackMap(prev => ({ ...prev, [message.id]: 'positive' }));
                      }}
                      className={cn(
                        "p-1 hover:bg-muted rounded-md transition-colors",
                        feedbackMap[message.id] === 'positive' && "text-green-500"
                      )}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => {
                        handleFeedback(message.id, 'negative');
                        setFeedbackMap(prev => ({ ...prev, [message.id]: 'negative' }));
                      }}
                      className={cn(
                        "p-1 hover:bg-muted rounded-md transition-colors",
                        feedbackMap[message.id] === 'negative' && "text-red-500"
                      )}
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Loading indicator shown when AI is "thinking" */}
          {isLoading && (
            <motion.div
              className="flex gap-2 items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* AI avatar icon */}
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
              {/* Loading dots container with blockquote styling */}
              <div className="text-foreground/90 pl-4 border-l-2 border-primary/20 font-light">
                <LoadingDots />
              </div>
            </motion.div>
          )}

          {/* Invisible element for scroll anchoring */}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed input section at bottom */}
        <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-sm p-2 md:p-4">
          {/* Input and send button container */}
          <div className="relative flex items-center gap-2 max-w-[85rem] mx-auto">
            <div className={cn(
              "relative bg-background rounded-xl border shadow-sm w-full",
              uploadedImages.length > 0 ? 'p-4' : 'p-2 md:p-3'
            )}>
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="h-10 w-10 rounded-full shrink-0 bg-blue-500 hover:bg-[#0866FF]/90"
                  disabled={isLoading || (!inputMessage.trim() && uploadedImages.length === 0)}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

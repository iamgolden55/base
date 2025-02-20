"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@heroui/react"
import { Icons } from "@/app/components/ui/icons"
import { Avatar } from "@heroui/react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Trash, Send, Plus, Bot, Copy, RefreshCcw, ThumbsUp, ThumbsDown, FileText, Image, X, File } from "lucide-react"
import { Spinner } from "@heroui/react"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  feedback?: 'like' | 'dislike'
  attachments?: Array<{
    type: 'image' | 'pdf' | 'doc'
    url: string
    name: string
  }>
}

type Attachment = {
  type: 'image' | 'pdf' | 'doc'
  url: string
  name: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if ((!input.trim() && attachments.length === 0) || isLoading) return

    // Create an array of attachment promises
    const attachmentPromises = attachments.map(async (file) => {
      // For images, create a proper preview URL
      if (file.type.includes('image')) {
        return new Promise<Attachment>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve({
              type: 'image',
              url: reader.result as string,
              name: file.name
            })
          }
          reader.readAsDataURL(file)
        })
      }
      
      // For other files, just use the basic URL
      return {
        type: file.type.includes('pdf') ? 'pdf' : 'doc',
        url: URL.createObjectURL(file),
        name: file.name
      } as Attachment
    })

    // Wait for all attachments to be processed
    const processedAttachments = await Promise.all(attachmentPromises)

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      attachments: processedAttachments
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setAttachments([])
    setIsLoading(true)
    inputRef.current?.focus()

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "This is a simulated response. Replace with actual LLM integration.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleRegenerate = async (messageId: string) => {
    setIsLoading(true)
    const messageIndex = messages.findIndex(m => m.id === messageId)
    setMessages(messages.slice(0, messageIndex))
    
    // Simulate regeneration (replace with actual API call)
    setTimeout(() => {
      const newResponse: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "This is a regenerated response.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword']
    
    const validFiles = files.filter(file => {
      const isValidType = validTypes.includes(file.type)
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB limit
      
      if (!isValidType) {
        alert(`File type ${file.type} is not supported`)
      }
      if (!isValidSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB`)
      }
      
      return isValidType && isValidSize
    })

    setAttachments(prev => [...prev, ...validFiles])
  }

  const handleFeedback = async (messageId: string, type: 'like' | 'dislike') => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, feedback: type }
        : message
    ))
    
    // Here you would typically send the feedback to your backend
    console.log(`Feedback ${type} for message ${messageId}`)
  }

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      // Optional: Add a toast notification here to show success
    } catch (err) {
      console.error('Failed to copy text:', err)
      // Optional: Add error handling notification
    }
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-background to-background/80">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar
              isBordered
              color="primary"
              src="/avatars/ai.png"
              fallback="AI"
              className="h-8 w-8"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight">Elera Health Assistant</h1>
              <p className="text-sm text-muted-foreground">Always here to help</p>
            </div>
          </div>
          <Button 
            variant="flat" 
            size="sm" 
            className="rounded-full hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setMessages([])}
          >
            <Trash className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container space-y-4 max-w-3xl mx-auto py-4">
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-8 text-center">
                  <Bot className="h-12 w-12 mx-auto text-muted-foreground/60" />
                  <h2 className="mt-4 text-lg font-semibold">Welcome to Elera Health Assistant</h2>
                  <p className="mt-2 text-muted-foreground">
                    Ask me anything about your health concerns or medical questions.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {["How can I improve my sleep?", "What are common cold remedies?", "Tips for reducing stress"].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="flat"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setInput(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "flex gap-3 max-w-[85%] p-4 rounded-2xl",
                      message.role === 'user' 
                        ? "ml-auto bg-primary/10" 
                        : "bg-secondary/40"
                    )}
                  >
                    <Avatar
                      isBordered
                      src={message.role === 'user' ? "/avatars/user.png" : "/avatars/ai.png"}
                      fallback={message.role === 'user' ? "U" : "AI"}
                      className={cn(
                        "h-8 w-8",
                        message.role === 'user' ? "bg-primary/20" : "bg-secondary"
                      )}
                    />
                    <div className="flex-1 space-y-3">
                      <p className="text-sm font-medium">
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {message.content}
                      </p>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="relative group">
                              {attachment.type === 'image' ? (
                                <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                                  <img
                                    src={attachment.url}
                                    alt={attachment.name}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedImage(attachment.url)
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40 border">
                                  {attachment.type === 'pdf' ? (
                                    <FileText className="h-4 w-4" />
                                  ) : (
                                    <File className="h-4 w-4" />
                                  )}
                                  <span className="text-sm truncate max-w-[150px]">
                                    {attachment.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>

                  {/* Message Actions - Only shown for AI responses */}
                  {message.role === 'assistant' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 ml-12"
                    >
                      <Button
                        variant="flat"
                        size="sm"
                        className="rounded-full h-7 w-7 p-0 hover:bg-secondary"
                        onClick={() => handleCopy(message.content)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="flat"
                        size="sm"
                        className="rounded-full h-7 w-7 p-0 hover:bg-secondary"
                        onClick={() => handleRegenerate(message.id)}
                      >
                        <RefreshCcw className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="flat"
                        size="sm"
                        className={cn(
                          "rounded-full h-7 w-7 p-0",
                          message.feedback === 'like' 
                            ? "bg-green-500/10 text-green-600" 
                            : "hover:bg-green-500/10 hover:text-green-600"
                        )}
                        onClick={() => handleFeedback(message.id, 'like')}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="flat"
                        size="sm"
                        className={cn(
                          "rounded-full h-7 w-7 p-0",
                          message.feedback === 'dislike' 
                            ? "bg-red-500/10 text-red-600" 
                            : "hover:bg-red-500/10 hover:text-red-600"
                        )}
                        onClick={() => handleFeedback(message.id, 'dislike')}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              ))
            )}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-4 max-w-[85%] rounded-2xl bg-secondary/40"
            >
              <Avatar
                isBordered
                src="/avatars/ai.png"
                fallback="AI"
                className="h-8 w-8 bg-secondary"
              />
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Form */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <form onSubmit={handleSubmit} className="container max-w-3xl">
          <div className="flex gap-2 items-center">
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
              />
              <Button
                type="button"
                variant="flat"
                size="md"
                className="rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="h-4 w-4" />
              </Button>
              {attachments.length > 0 && (
                <div className="absolute bottom-full mb-2 left-0 bg-background/95 backdrop-blur p-2 rounded-lg border shadow-lg">
                  <div className="flex flex-col gap-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40">
                          {file.type.includes('image') ? (
                            <Image className="h-4 w-4" />
                          ) : file.type.includes('pdf') ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <File className="h-4 w-4" />
                          )}
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <Button
                          variant="flat"
                          size="sm"
                          className="rounded-full h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="rounded-full pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 p-0"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Spinner 
                    size="sm"
                    color="current"
                    className="h-4 w-4"
                  />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="object-contain max-w-full max-h-[90vh]"
            />
            <Button
              variant="flat"
              size="sm"
              className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/75"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

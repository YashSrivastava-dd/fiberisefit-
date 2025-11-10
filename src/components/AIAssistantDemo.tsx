import { useState, useEffect, useRef } from "react";
import { Sparkles, MessageCircle, ArrowRight, Send, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { sendChatMessage, generateSessionId } from "@/lib/ai/chat";

interface Message {
  type: "ai" | "user" | "options";
  content: string;
  options?: string[];
}

export const AIAssistantDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => generateSessionId());
  const [conversationStarted, setConversationStarted] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial greeting from AI
  useEffect(() => {
    if (!conversationStarted && messages.length === 0) {
      setConversationStarted(true);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages([
            {
              type: "ai",
              content:
                "Hello! I'm Zoe, your personal wellness assistant, powered by Gemini 2.5 AI. I'm here to help you achieve your health goals with Fyber. May I ask a few questions to personalize your journey?",
            },
          ]);
          setIsTyping(false);
        }, 800);
      }, 300);
    }
  }, [conversationStarted, messages.length]);

  // Auto-scroll to bottom only within the chat container and only after user interaction
  useEffect(() => {
    // Only scroll if user has interacted (clicked an option or sent a message)
    // This prevents jumping on page refresh
    if (userHasInteracted && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messages, isTyping, userHasInteracted]);

  // Focus input when user starts interacting
  useEffect(() => {
    if (userHasInteracted && inputRef.current && !isTyping) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [userHasInteracted, isTyping]);

  const handleAIMessage = (content: string, showTypingDelay = true) => {
    if (showTypingDelay) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { type: "ai", content }]);
        setIsTyping(false);
      }, 800);
    } else {
      setMessages((prev) => [...prev, { type: "ai", content }]);
    }
  };

  const addOptions = (options: string[]) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "options", content: "", options }]);
    }, 500);
  };

  const sendMessageToAI = async (userMessage: string) => {
    // Add user message immediately
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage({
        message: userMessage,
        sessionId,
      });

      // Add AI response (no typing delay since we're already showing typing indicator)
      handleAIMessage(response.reply, false);
      setIsTyping(false);

      // After AI response, check if we should show options
      setTimeout(() => {
        // Check if the response suggests asking a question or needs user input
        const lowerReply = response.reply.toLowerCase();
        const lowerMessage = userMessage.toLowerCase();
        
        // Show options for certain conversation patterns
        if (
          lowerReply.includes("what") ||
          lowerReply.includes("which") ||
          lowerReply.includes("would you like") ||
          lowerReply.includes("ready to") ||
          lowerReply.includes("shall we") ||
          lowerReply.includes("?") ||
          (lowerMessage.includes("begin") && messages.length <= 3)
        ) {
          // Add contextual options based on the conversation
          const contextualOptions = getContextualOptions(userMessage, response.reply);
          if (contextualOptions.length > 0) {
            addOptions(contextualOptions);
          }
        }
      }, 1200);
    } catch (error) {
      console.error("AI Chat error:", error);
      setIsTyping(false);
      handleAIMessage(
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        false
      );
    }
  };

  const getContextualOptions = (userMessage: string, aiReply: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    const lowerReply = aiReply.toLowerCase();

    // Initial greeting options
    if (messages.length <= 1) {
      return ["Yes, let's begin", "Tell me more first"];
    }

    // Goal-based options
    if (lowerMessage.includes("begin") || lowerMessage.includes("start")) {
      return ["Lose weight", "Improve gut health", "Boost energy", "All of the above"];
    }

    // Product inquiry options
    if (lowerReply.includes("bundle") || lowerReply.includes("supply")) {
      return ["3-month supply", "6-month supply", "Tell me more"];
    }

    // General continuation options
    if (lowerReply.includes("explain") || lowerReply.includes("understand")) {
      return ["Yes, please explain", "I'm ready to start", "What's next?"];
    }

    return [];
  };

  const handleOptionClick = (option: string) => {
    // Mark that user has interacted
    setUserHasInteracted(true);
    // Send the option as a user message to the AI
    sendMessageToAI(option);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    
    // Mark that user has interacted
    setUserHasInteracted(true);
    // Send the message
    sendMessageToAI(input.trim());
    // Clear input
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Show initial options after first AI message
  useEffect(() => {
    if (messages.length === 1 && messages[0].type === "ai" && !isTyping) {
      setTimeout(() => {
        addOptions(["Yes, let's begin", "Tell me more first"]);
      }, 1500);
    }
  }, [messages.length, isTyping]);

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by Gemini 2.5</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Meet Your Intelligent Wellness Assistant
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience how our Gemini-powered AI guides your transformation with personalized
            recommendations, progress tracking, and expert support in real-time.
          </p>
        </div>

        {/* Interactive Demo Container */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-background/50 backdrop-blur-sm border-primary/20 shadow-premium">
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border">
              <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Zoe - AI Assistant</h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Online • Powered by Gemini 2.5</span>
                </div>
              </div>
              <Badge className="ml-auto bg-primary/10 text-primary border-primary/20">Live</Badge>
            </div>

            {/* Messages Container */}
            <div 
              ref={scrollContainerRef}
              className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto pr-2"
            >
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.type === "ai" && (
                    <div className="flex gap-3 animate-fade-in">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-secondary/50 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.type === "user" && (
                    <div className="flex gap-3 justify-end animate-fade-in">
                      <div className="flex-1 flex justify-end">
                        <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tr-sm p-4 max-w-[85%]">
                          <p className="text-foreground leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary-foreground">You</span>
                      </div>
                    </div>
                  )}

                  {msg.type === "options" && msg.options && (
                    <div className="flex gap-3 animate-fade-in">
                      <div className="h-8 w-8 flex-shrink-0"></div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[85%]">
                        {msg.options.map((option, optIdx) => (
                          <Button
                            key={optIdx}
                            variant="outline"
                            className="justify-start text-left h-auto py-3 px-4 hover:bg-primary/10 hover:border-primary/50 transition-all"
                            onClick={() => handleOptionClick(option)}
                          >
                            <span className="flex-1">{option}</span>
                            <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-secondary/50 rounded-2xl rounded-tl-sm p-4">
                    <div className="flex gap-1">
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or choose an option above..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  className="shrink-0"
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                <span className="font-semibold text-primary">Live AI:</span> This assistant uses Gemini 2.5
                to provide personalized wellness guidance, product recommendations, and support in real-time.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};


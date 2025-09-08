"use client";

import { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { chatbotAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Loader2, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialState = {
  response: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
    </Button>
  );
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, formAction] = useFormState(chatbotAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.response) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: state.response },
      ]);
      formRef.current?.reset();
    }
  }, [state.response, state.error]);

  const handleFormAction = (formData: FormData) => {
    const message = formData.get("message") as string;
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    formAction(formData);
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom.
        // scrollAreaRef.current.children[1] is the viewport.
        const viewport = scrollAreaRef.current.children[1];
        if (viewport) {
           viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages])

  return (
    <Card className="flex flex-col h-[calc(100vh-200px)]">
      <CardContent className="flex-1 p-6 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4",
                  message.role === "user" ? "justify-end" : ""
                )}
              >
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg p-3 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form ref={formRef} action={handleFormAction} className="flex w-full items-center gap-2">
          <Input
            name="message"
            placeholder="Type your message..."
            autoComplete="off"
            required
          />
          <SubmitButton />
        </form>
         {state.error && (
          <p className="text-sm text-destructive mt-2">{state.error}</p>
        )}
      </CardFooter>
    </Card>
  );
}

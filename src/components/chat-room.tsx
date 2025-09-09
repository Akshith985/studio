// src/components/chat-room.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useAuth } from '@/context/auth-provider';
import { sendMessageAction, getMessages } from '@/lib/actions';
import type { Message } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Loader2, User } from 'lucide-react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      {pending ? <Loader2 className="animate-spin" /> : <Send />}
    </Button>
  );
}

export function ChatRoom() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const newMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          newMessages.push({
            id: doc.id,
            text: data.text,
            userEmail: data.userEmail,
            timestamp: data.timestamp.toDate(),
          });
        });
        setMessages(newMessages);
      },
      (err) => {
        console.error(err);
        setError('Failed to fetch messages. Please try refreshing the page.');
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = async (formData: FormData) => {
    const result = await sendMessageAction(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      formRef.current?.reset();
      setError(null);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.children[1] as HTMLDivElement;
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const getInitials = (email?: string | null) => {
    if (!email || email === 'Anonymous') return <User className="h-4 w-4"/>;
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="flex flex-col flex-1">
      <CardContent className="flex-1 p-6 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', user?.email === message.userEmail ? 'justify-end' : '')}
              >
                {user?.email !== message.userEmail && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{getInitials(message.userEmail)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-[75%]")}>
                  <div
                    className={cn(
                      'rounded-lg p-3 text-sm',
                      user?.email === message.userEmail
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <p className={cn("text-xs text-muted-foreground mt-1", user?.email === message.userEmail ? 'text-right' : 'text-left' )}>
                     {message.userEmail} - {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </p>
                </div>
                {user?.email === message.userEmail && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t flex-col items-start gap-2">
         {!user && (
          <p className="text-sm text-muted-foreground">
            You are chatting as a guest. <Link href="/login" className="text-primary hover:underline">Login</Link> or <Link href="/register" className="text-primary hover:underline">Register</Link> to save your name.
          </p>
        )}
        <form ref={formRef} action={handleFormSubmit} className="flex w-full items-center gap-2">
          <Input name="message" placeholder="Type your message..." autoComplete="off" required />
          <SubmitButton />
        </form>
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </CardFooter>
    </Card>
  );
}

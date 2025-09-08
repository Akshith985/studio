
'use client';

import { useActionState, useRef, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContactMessageAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState = {
  success: false,
  error: undefined,
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactMessageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contact a Counsellor</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Reach out for professional support. Fill out the form below, and we'll connect you with a counsellor.
        </p>
      </div>
      
      {state.success ? (
        <Alert variant="default" className="border-green-500 text-green-700">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Message Sent!</AlertTitle>
            <AlertDescription>
                Thank you for reaching out. A counsellor will get back to you shortly.
            </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <form ref={formRef} action={formAction}>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>
                Your message will be sent securely to a qualified professional.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter your name" required />
                   {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                  {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe what you're going through. The more detail you can provide, the better our counsellors can assist you."
                  rows={6}
                  required
                />
                {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
              </div>
               {state.error && !state.errors && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}

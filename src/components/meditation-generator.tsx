"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateMeditationAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

const initialState = {
  script: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Generate Meditation
        </>
      )}
    </Button>
  );
}

export function MeditationGenerator() {
  const [state, formAction] = useFormState(generateMeditationAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.script) {
        formRef.current?.reset();
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.script])

  return (
    <div className="space-y-8">
      <Card>
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle>Describe Your Mood</CardTitle>
            <CardDescription>
              Tell us how you&apos;re feeling, and we&apos;ll create a meditation just for
              you. e.g., &quot;I&apos;m feeling stressed about work&quot; or &quot;Anxious about an upcoming event&quot;.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mood">Your Mood</Label>
                <Textarea id="mood" name="mood" placeholder="I am feeling..." required />
                {state.error && <p className="text-sm text-destructive">{state.error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      {state.script && (
        <div ref={resultRef}>
            <Card className="bg-primary/5">
            <CardHeader>
                <CardTitle>Your Personalized Meditation</CardTitle>
                <CardDescription>Find a comfortable position, close your eyes, and follow the guide.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-body">
                    {state.script}
                </div>
            </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}


"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Frown, Laugh, Meh, Smile, Wind } from "lucide-react";
import { usePoints } from "@/context/points-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Mood = "Sad" | "Neutral" | "Happy" | "Excited";

const pointValues: Record<Mood, number> = {
  Sad: -2,
  Neutral: 0,
  Happy: 2,
  Excited: 5,
};

const moodConfig = {
  Sad: { value: 1, icon: Frown, color: "hsl(var(--chart-5))" },
  Neutral: { value: 2, icon: Meh, color: "hsl(var(--chart-4))" },
  Happy: { value: 3, icon: Smile, color: "hsl(var(--chart-2))" },
  Excited: { value: 4, icon: Laugh, color: "hsl(var(--chart-1))" },
};

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isSadDialogOpen, setIsSadDialogOpen] = useState(false);
  const { addPoints } = usePoints();

  const logMood = (mood: Mood) => {
    setSelectedMood(mood);
    addPoints(pointValues[mood]);
    
    if (mood === "Sad") {
      setIsSadDialogOpen(true);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Log your mood to see your mascot react!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-around rounded-lg bg-muted p-2">
            {(Object.keys(moodConfig) as Mood[]).map((mood) => {
              const { icon: Icon, color } = moodConfig[mood];
              const isSelected = selectedMood === mood;
              return (
                <Button
                  key={mood}
                  variant={isSelected ? "default" : "ghost"}
                  size="icon"
                  className={`h-14 w-14 rounded-full flex-col gap-1 transition-all ${isSelected ? 'scale-110' : ''}`}
                  style={isSelected ? { backgroundColor: color, color: 'white' } : {}}
                  onClick={() => logMood(mood)}
                  aria-label={`Log mood as ${mood}`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs">{mood}</span>
                </Button>
              );
            })}
          </div>
          <div className="flex justify-start items-center gap-4">
              <div className="w-1/3">
                  <Image 
                      src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXc2NnQyNHg4eXl0cG44Ympkenk2ZWtlcTE4d29ndzl3eGR2dG1oYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4zPGdstL9xlbh4GVmL/giphy.gif"
                      alt="Your friendly mascot"
                      width={200}
                      height={200}
                      unoptimized
                      className="rounded-lg"
                  />
              </div>
              <div className="w-2/3">
                   <p className="text-4xl font-bold text-center italic text-primary">&quot;What&apos;s cookin&apos;?&quot;</p>
                   <p className="text-md text-muted-foreground text-right pr-4">- ChillCat</p>
              </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isSadDialogOpen} onOpenChange={setIsSadDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>What's the problem champ?</AlertDialogTitle>
          </AlertDialogHeader>
           <div className="flex items-center gap-4">
             <Image 
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTJkeGdvMzB1ZGFoOG1uaXBsMDh5NDZobmpzbWVtN2F0Y2VyOWpmayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4tyXpIGdDdPdF7E5ok/giphy.gif"
                alt="Supportive pat"
                width={250}
                height={250}
                unoptimized
                className="rounded-lg"
                data-ai-hint="supportive pat"
            />
            <p className="text-lg font-medium text-muted-foreground">Remember, take time for yourself.</p>
           </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href="/unwind">
                <Wind className="mr-2 h-4 w-4" /> Go to Unwind Corner
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

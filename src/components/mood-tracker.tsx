
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Frown, Laugh, Meh, Smile } from "lucide-react";

type Mood = "Sad" | "Neutral" | "Happy" | "Excited";

const moodConfig = {
  Sad: { value: 1, icon: Frown, color: "hsl(var(--chart-5))" },
  Neutral: { value: 2, icon: Meh, color: "hsl(var(--chart-4))" },
  Happy: { value: 3, icon: Smile, color: "hsl(var(--chart-2))" },
  Excited: { value: 4, icon: Laugh, color: "hsl(var(--chart-1))" },
};

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const logMood = (mood: Mood) => {
    setSelectedMood(mood);
    // Here you could add logic to save the mood for the day
  };

  return (
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
        <div className="flex justify-center items-center">
            <Image 
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXc2NnQyNHg4eXl0cG44Ympkenk2ZWtlcTE4d29ndzl3eGR2dG1oYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/4zPGdstL9xlbh4GVmL/giphy.gif"
                alt="Your friendly mascot"
                width={150}
                height={150}
                unoptimized
                className="rounded-lg"
            />
        </div>
      </CardContent>
    </Card>
  );
}

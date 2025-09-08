"use client";

import { useState, useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Frown, Laugh, Meh, Smile } from "lucide-react";
import { addDays, format } from "date-fns";

type Mood = "Sad" | "Neutral" | "Happy" | "Excited";

type MoodEntry = {
  date: Date;
  mood: Mood;
};

const initialMoodData: MoodEntry[] = [
  { date: addDays(new Date(), -6), mood: "Happy" },
  { date: addDays(new Date(), -5), mood: "Neutral" },
  { date: addDays(new Date(), -4), mood: "Excited" },
  { date: addDays(new Date(), -3), mood: "Sad" },
  { date: addDays(new Date(), -2), mood: "Happy" },
  { date: addDays(new Date(), -1), mood: "Neutral" },
];

const moodConfig = {
  Sad: { value: 1, icon: Frown, color: "hsl(var(--chart-5))" },
  Neutral: { value: 2, icon: Meh, color: "hsl(var(--chart-4))" },
  Happy: { value: 3, icon: Smile, color: "hsl(var(--chart-2))" },
  Excited: { value: 4, icon: Laugh, color: "hsl(var(--chart-1))" },
};

export function MoodTracker() {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(initialMoodData);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const logMood = (mood: Mood) => {
    setSelectedMood(mood);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingEntryIndex = moodHistory.findIndex(
      (entry) => entry.date.getTime() === today.getTime()
    );

    let newHistory = [...moodHistory];
    if (existingEntryIndex !== -1) {
      newHistory[existingEntryIndex] = { date: today, mood };
    } else {
      newHistory.push({ date: today, mood });
    }
    
    // Keep only last 7 days
    if(newHistory.length > 7) {
        newHistory = newHistory.slice(-7);
    }

    setMoodHistory(newHistory.sort((a,b) => a.date.getTime() - b.date.getTime()));
  };
  
  const chartData = useMemo(() => {
    return moodHistory.map((entry) => ({
      date: format(entry.date, "MMM d"),
      moodValue: moodConfig[entry.mood].value,
      fill: moodConfig[entry.mood].color,
    }));
  }, [moodHistory]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>Log your mood to track your emotional well-being.</CardDescription>
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
        <div>
          <h3 className="mb-4 text-sm font-medium text-center text-muted-foreground">Your Mood This Week</h3>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide={true} domain={[0, 4]} />
                 <Tooltip
                    content={<ChartTooltipContent hideLabel />}
                    cursor={{ fill: "hsl(var(--accent))", radius: 4 }}
                  />
                <Bar dataKey="moodValue" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

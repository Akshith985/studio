"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const tips = [
  "Stay hydrated by drinking plenty of water throughout the day.",
  "Take a 5-minute break to stretch for every hour of sitting.",
  "Practice gratitude by writing down three things you're thankful for.",
  "Go for a short walk in nature to clear your mind.",
  "Disconnect from screens an hour before you go to sleep.",
  "Try a new healthy recipe this week.",
  "Listen to your favorite calming music to de-stress.",
];

export function WellnessTip() {
  const [tip, setTip] = useState("");

  const getNewTip = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTip(tips[randomIndex]);
  }, []);

  useEffect(() => {
    getNewTip();
  }, [getNewTip]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Wellness Tip</CardTitle>
        <Lightbulb className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{tip}</p>
      </CardContent>
    </Card>
  );
}

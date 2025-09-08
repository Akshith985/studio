"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const affirmations = [
  "I am capable of achieving my goals.",
  "I choose to be happy and to love myself today.",
  "My mind is full of brilliant ideas.",
  "I am worthy of love, happiness, and success.",
  "I let go of all that no longer serves me.",
  "I am at peace with my past and excited for my future.",
  "Every day, in every way, I am getting better and better.",
  "I am calm, confident, and centered.",
  "I embrace the challenges of today with a positive mindset.",
  "I am grateful for all the good in my life."
];

export function AffirmationCard() {
  const [affirmation, setAffirmation] = useState("");

  const getNewAffirmation = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  }, []);

  useEffect(() => {
    getNewAffirmation();
  }, [getNewAffirmation]);

  return (
    <Card className="bg-accent/50 border-accent">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-accent-foreground">
          Positive Affirmation
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={getNewAffirmation} aria-label="Get new affirmation">
          <RefreshCcw className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-semibold text-accent-foreground">&ldquo;{affirmation}&rdquo;</p>
      </CardContent>
    </Card>
  );
}

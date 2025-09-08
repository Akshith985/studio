"use client";

import { useState } from 'react';
import { getBreathingRecommendationsAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Wind, Loader2 } from 'lucide-react';
import { BreathingVisualizer } from './breathing-visualizer';

export function BreathingExercise() {
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exerciseCount, setExerciseCount] = useState<number | null>(null);
  const [isExercising, setIsExercising] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    const result = await getBreathingRecommendationsAction(anxietyLevel);
    if (result.error) {
      setError(result.error);
    } else if (result.count) {
      setExerciseCount(result.count);
      setIsExercising(true);
    }
    setLoading(false);
  };

  const handleFinish = () => {
    setIsExercising(false);
    setExerciseCount(null);
  };
  
  if (isExercising && exerciseCount) {
    return <BreathingVisualizer cycles={exerciseCount} onFinish={handleFinish} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Anxiety Level</CardTitle>
        <CardDescription>
          On a scale of 1 to 10, how anxious are you feeling right now? We&apos;ll tailor the exercise duration for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl font-bold text-primary">{anxietyLevel}</span>
          <Slider
            value={[anxietyLevel]}
            onValueChange={(value) => setAnxietyLevel(value[0])}
            min={1}
            max={10}
            step={1}
            className="w-full max-w-sm"
            aria-label={`Anxiety level ${anxietyLevel}`}
          />
        </div>
        {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStart} disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Getting Recommendation...
            </>
          ) : (
            <>
              <Wind className="mr-2 h-4 w-4" />
              Start Breathing
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

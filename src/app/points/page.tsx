
// src/app/points/page.tsx
'use client';

import { usePoints } from '@/context/points-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Trophy } from 'lucide-react';

export default function PointsPage() {
  const { points } = usePoints();

  return (
    <div className="mx-auto max-w-md">
       <p className="mt-2 text-lg text-muted-foreground text-center mb-8">
          Keep engaging with the app to earn more points and unlock new levels!
        </p>
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl">Wellness Rewards</CardTitle>
          <CardDescription>Your current points balance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
             <Sparkles className="h-12 w-12 text-primary" />
             <p className="text-6xl font-bold">{points.toLocaleString()}</p>
          </div>
           <p className="text-muted-foreground mt-2">Points</p>
        </CardContent>
      </Card>
    </div>
  );
}

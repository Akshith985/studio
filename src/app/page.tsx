
'use client';

import { AffirmationCard } from "@/components/affirmation-card";
import { MoodTracker } from "@/components/mood-tracker";
import { Soundscapes } from "@/components/soundscapes";
import { WellnessTip } from "@/components/wellness-tip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wind, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePoints } from "@/context/points-provider";

export default function DashboardPage() {
  const { points } = usePoints();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hello, there!</h2>
        <p className="text-muted-foreground">
          Welcome back. Take a moment for yourself today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          <AffirmationCard />
        </div>
        
        <div className="md:col-span-2 lg:col-span-2">
           <MoodTracker />
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild size="lg">
                <Link href="/unwind">
                  <Wind className="mr-2 h-5 w-5" />
                  Go to Unwind Corner
                </Link>
              </Button>
               <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    <Trophy className="mr-2 h-5 w-5" />
                    View My Points
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Your Wellness Rewards</AlertDialogTitle>
                    <AlertDialogDescription>
                      You've earned points by engaging with the app. Keep it up!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex items-center justify-center gap-4 py-8">
                    <Sparkles className="h-12 w-12 text-primary" />
                    <p className="text-6xl font-bold">{points.toLocaleString()}</p>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
           <WellnessTip />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
           <Soundscapes />
        </div>
      </div>
    </div>
  );
}

import { AffirmationCard } from "@/components/affirmation-card";
import { MoodTracker } from "@/components/mood-tracker";
import { Soundscapes } from "@/components/soundscapes";
import { WellnessTip } from "@/components/wellness-tip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Wind } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hello, there!</h1>
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
                <Link href="/meditation">
                  <BrainCircuit className="mr-2 h-5 w-5" />
                  Start Guided Meditation
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/breathing">
                  <Wind className="mr-2 h-5 w-5" />
                  Practice Breathing
                </Link>
              </Button>
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

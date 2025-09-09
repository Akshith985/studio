// src/app/unwind/page.tsx
import { MeditationGenerator } from "@/components/meditation-generator";
import { BreathingExercise } from "@/components/breathing-exercise";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, Wind } from "lucide-react";

export default function UnwindPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Unwind Corner</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your dedicated space for relaxation and mindfulness.
        </p>
      </div>
      <Tabs defaultValue="meditation" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meditation">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Guided Meditation
          </TabsTrigger>
          <TabsTrigger value="breathing">
            <Wind className="mr-2 h-4 w-4" />
            Breathing Exercises
          </TabsTrigger>
        </TabsList>
        <TabsContent value="meditation" className="mt-6">
          <MeditationGenerator />
        </TabsContent>
        <TabsContent value="breathing" className="mt-6">
          <BreathingExercise />
        </TabsContent>
      </Tabs>
    </div>
  );
}

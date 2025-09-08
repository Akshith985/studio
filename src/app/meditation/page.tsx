import { MeditationGenerator } from "@/components/meditation-generator";

export default function MeditationPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Guided Meditation</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create a personalized meditation script based on your current mood.
        </p>
      </div>
      <MeditationGenerator />
    </div>
  );
}

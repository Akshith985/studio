import { BreathingExercise } from "@/components/breathing-exercise";

export default function BreathingPage() {
    return (
        <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Breathing Exercises</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Calm your mind and body with guided breathing.
                </p>
            </div>
            <BreathingExercise />
        </div>
    )
}
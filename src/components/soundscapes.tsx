// src/components/soundscapes.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Soundscapes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual Relaxation</CardTitle>
        <CardDescription>
          Take a moment to unwind with a calming visual.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
            <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                 <Image 
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJteXptaGJzYnY3a3gzc285azRjdWR3NmRnNWxxZHgxZGZmaXhueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TjEXENVrA4PxUsn0zM/giphy.gif"
                    alt="Calming visual"
                    width={128}
                    height={128}
                    unoptimized
                    className="object-cover rounded-lg"
                    data-ai-hint="cozy fireplace"
                />
            </div>
            <p className="text-muted-foreground italic">
                Let the gentle flicker of the fire bring you a sense of peace and tranquility.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}

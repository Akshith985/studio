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
          Take a moment to unwind with calming visuals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative overflow-hidden rounded-lg flex-shrink-0 aspect-square">
                 <Image 
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJteXptaGJzYnY3a3gzc285azRjdWR3NmRnNWxxZHgxZGZmaXhueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TjEXENVrA4PxUsn0zM/giphy.gif"
                    alt="Calming visual"
                    fill
                    unoptimized
                    className="object-cover rounded-lg"
                    data-ai-hint="cozy fireplace"
                />
            </div>
            <div className="relative overflow-hidden rounded-lg w-full" style={{paddingTop: "56.25%"}}>
                 <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/OGZjYnZg4Cs" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                 </iframe>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

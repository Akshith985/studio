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
        <div className="flex justify-center items-center">
            <div className="w-full max-w-lg aspect-video relative overflow-hidden rounded-lg">
                 <Image 
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJteXptaGJzYnY3a3gzc285azRjdWR3NmRnNWxxZHgxZGZmaXhueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TjEXENVrA4PxUsn0zM/giphy.gif"
                    alt="Calming visual"
                    fill
                    unoptimized
                    className="object-cover"
                    data-ai-hint="cozy fireplace"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

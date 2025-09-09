// src/components/soundscapes.tsx
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";

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
            <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                 <Image 
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJteXptaGJzYnY3a3gzc285azRjdWR3NmRnNWxxZHgxZGZmaXhueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TjEXENVrA4PxUsn0zM/giphy.gif"
                    alt="Calming visual"
                    width={250}
                    height={250}
                    unoptimized
                    className="object-cover rounded-lg w-full aspect-square"
                    data-ai-hint="cozy fireplace"
                />
            </div>
            <div className="relative aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Video className="w-16 h-16 text-muted-foreground" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                 <p className="text-white font-semibold">Video Placeholder</p>
              </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

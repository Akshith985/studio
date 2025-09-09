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
          <div className="flex items-center gap-4">
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
             <div className="relative bg-muted p-4 rounded-lg rounded-bl-none shadow-md">
                <p className="text-md italic text-foreground">&quot;Hello Traveller, welcome to the lands where you love yourself&quot;</p>
                <div className="absolute bottom-0 left-[-10px] w-0 h-0 border-t-[10px] border-t-transparent border-r-[10px] border-r-muted border-b-[10px] border-b-transparent"></div>
            </div>
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

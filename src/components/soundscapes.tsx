
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
            <div className="w-full aspect-video relative overflow-hidden rounded-lg">
                 <Image 
                    src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2dndm1idmJsaWowcTRoZ2QzZGY0eXF6d2ozY2Y5dmt0N2h3bnZwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3vR16p72r7i06Fk4/giphy.gif"
                    alt="Calming visual"
                    fill
                    unoptimized
                    className="object-cover"
                    data-ai-hint="calm ocean"
                />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

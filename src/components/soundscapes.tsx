
// src/components/soundscapes.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Play, X } from "lucide-react";

const soundscapes = [
  {
    title: "Gentle Rain",
    duration: "15 min",
    imageUrl: "https://picsum.photos/400/200?random=1",
    "data-ai-hint": "rain window",
    audioUrl: "https://storage.googleapis.com/studioprod-assets/rain.mp3",
  },
  {
    title: "Forest Ambience",
    duration: "20 min",
    imageUrl: "https://picsum.photos/400/200?random=2",
    "data-ai-hint": "forest path",
    audioUrl: "https://storage.googleapis.com/studioprod-assets/forest.mp3",
  },
  {
    title: "Ocean Waves",
    duration: "30 min",
    imageUrl: "https://picsum.photos/400/200?random=3",
    "data-ai-hint": "ocean waves",
    audioUrl: "https://storage.googleapis.com/studioprod-assets/ocean.mp3",
  },
  {
    title: "Quiet Night",
    duration: "25 min",
    imageUrl: "https://picsum.photos/400/200?random=4",
    "data-ai-hint": "night sky",
    audioUrl: "https://storage.googleapis.com/studioprod-assets/night.mp3",
  },
];

type Soundscape = (typeof soundscapes)[0];

export function Soundscapes() {
  const [activeSoundscape, setActiveSoundscape] = useState<Soundscape | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
        if (activeSoundscape) {
            if (audioElement.src !== activeSoundscape.audioUrl) {
                audioElement.src = activeSoundscape.audioUrl;
                audioElement.load();
            }
            audioElement.play().catch(error => console.error("Audio playback failed:", error));
        } else {
            audioElement.pause();
        }
    }
  }, [activeSoundscape]);

  const handleStop = () => {
    setActiveSoundscape(null);
  };

  const handleSelectSoundscape = (scape: Soundscape) => {
    if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
    }
    
    if (activeSoundscape?.title === scape.title) {
        setActiveSoundscape(null);
    } else {
        setActiveSoundscape(scape);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calming Soundscapes</CardTitle>
        <CardDescription>
          Relax your mind with our curated collection of soundscapes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activeSoundscape && (
          <div className="relative">
            <h3 className="text-lg font-semibold mb-2">{activeSoundscape.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 -mt-2 -mr-2"
              onClick={handleStop}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!activeSoundscape ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {soundscapes.map((scape) => (
              <div
                key={scape.title}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => handleSelectSoundscape(scape)}
              >
                <Image
                  src={scape.imageUrl}
                  alt={scape.title}
                  width={400}
                  height={200}
                  data-ai-hint={scape['data-ai-hint']}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-bold">{scape.title}</h3>
                  <p className="text-sm">{scape.duration}</p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Play className="h-6 w-6 text-secondary-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <audio ref={audioRef} controls className={!activeSoundscape ? 'hidden' : 'w-full mt-4'}>
            Your browser does not support the audio element.
        </audio>

      </CardContent>
    </Card>
  );
}

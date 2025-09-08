import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

const soundscapes = [
  {
    title: "Gentle Rain",
    duration: "15 min",
    imageUrl: "https://picsum.photos/400/200?random=1",
    "data-ai-hint": "rain window",
  },
  {
    title: "Forest Ambience",
    duration: "20 min",
    imageUrl: "https://picsum.photos/400/200?random=2",
    "data-ai-hint": "forest path",
  },
  {
    title: "Ocean Waves",
    duration: "30 min",
    imageUrl: "https://picsum.photos/400/200?random=3",
    "data-ai-hint": "ocean waves",
  },
  {
    title: "Quiet Night",
    duration: "25 min",
    imageUrl: "https://picsum.photos/400/200?random=4",
    "data-ai-hint": "night sky",
  },
];

export function Soundscapes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calming Soundscapes</CardTitle>
        <CardDescription>
          Relax your mind with our curated collection of soundscapes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {soundscapes.map((scape) => (
            <div key={scape.title} className="relative group overflow-hidden rounded-lg">
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
                <Button size="icon" variant="secondary" className="rounded-full h-12 w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-6 w-6 text-secondary-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

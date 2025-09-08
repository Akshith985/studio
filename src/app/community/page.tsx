// src/app/community/page.tsx
import { CommunityChat } from "@/components/community-chat";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Community Hub</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect with others, share experiences, and find support.
        </p>
      </div>
      <CommunityChat />
    </div>
  );
}

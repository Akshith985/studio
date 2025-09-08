
import { VideoCall } from "@/components/video-call";

export default function VideoCallPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Video Call</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect with a professional for a one-on-one session.
        </p>
      </div>
      <VideoCall />
    </div>
  );
}

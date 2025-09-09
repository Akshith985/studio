
import { VideoCall } from "@/components/video-call";

export default function VideoCallPage() {
  return (
    <div className="mx-auto max-w-5xl">
       <p className="mt-2 text-lg text-muted-foreground text-center mb-8">
         Connect with a professional for a one-on-one session.
        </p>
      <VideoCall />
    </div>
  );
}


'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, PhoneOff, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function VideoCall() {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);
  
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {hasCameraPermission === false && (
           <Alert variant="destructive">
            <AlertTitle>Camera Access Required</AlertTitle>
            <AlertDescription>
                Please allow camera access in your browser settings and refresh the page to use this feature.
            </AlertDescription>
           </Alert>
        )}
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                 <video ref={localVideoRef} className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`} autoPlay muted playsInline />
                 {isVideoOff && <User className="h-24 w-24 text-muted-foreground" />}
                 <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">You</div>
            </div>
             <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                 <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Waiting for other user...</p>
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">Counsellor</div>
            </div>
        </div>

         <div className="flex justify-center items-center gap-4 mt-4 p-4 bg-muted rounded-lg">
            <Button variant={isMuted ? "destructive" : "secondary"} size="icon" onClick={toggleMute} className="rounded-full h-14 w-14">
                {isMuted ? <MicOff /> : <Mic />}
            </Button>
             <Button variant={isVideoOff ? "destructive" : "secondary"} size="icon" onClick={toggleVideo} className="rounded-full h-14 w-14">
                {isVideoOff ? <VideoOff /> : <Video />}
            </Button>
            <Button variant="destructive" size="icon" className="rounded-full h-14 w-14">
                <PhoneOff />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}


'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Video, VideoOff, PhoneOff, User, PhoneOutgoing } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export function VideoCall() {
  const { toast } = useToast();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [callActive, setCallActive] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const getCameraPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setHasCameraPermission(true);
      setCallActive(true);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCameraPermission(false);
      setCallActive(false);
      toast({
        variant: 'destructive',
        title: 'Camera Access Denied',
        description: 'Please enable camera permissions in your browser settings to use this app.',
      });
    }
  };

  const startCall = () => {
    getCameraPermission();
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setStream(null);
    setCallActive(false);
  };
  
  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !isMuted);
      setIsMuted(!isMuted);
    }
  };
  
  const toggleVideo = () => {
      if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

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
                 <video ref={localVideoRef} className={`w-full h-full object-cover ${!callActive || isVideoOff ? 'hidden' : 'block'}`} autoPlay muted playsInline />
                 {(!callActive || isVideoOff) && <User className="h-24 w-24 text-muted-foreground" />}
                 <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">You</div>
            </div>
             <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                 <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline />
                 <div className="absolute inset-0 flex items-center justify-center">
                    {!callActive ? (
                         <div className="text-center">
                            <p className="text-muted-foreground mb-4">Click below to start the call.</p>
                             <Button onClick={startCall} size="lg">
                                <PhoneOutgoing className="mr-2 h-5 w-5" />
                                Start Call
                            </Button>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Waiting for other user...</p>
                    )}
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/50 text-white text-sm px-2 py-1 rounded">Counsellor</div>
            </div>
        </div>
        {callActive && (
         <div className="flex justify-center items-center gap-4 mt-4 p-4 bg-muted rounded-lg">
            <Button variant={isMuted ? "secondary" : "default"} onClick={toggleMute} className="rounded-full h-14 w-14">
                {isMuted ? <MicOff /> : <Mic />}
            </Button>
             <Button variant={isVideoOff ? "secondary" : "default"} onClick={toggleVideo} className="rounded-full h-14 w-14">
                {isVideoOff ? <VideoOff /> : <Video />}
            </Button>
            <Button variant="destructive" onClick={endCall} className="rounded-full h-14 w-14">
                <PhoneOff />
            </Button>
        </div>
        )}
      </CardContent>
    </Card>
  );
}

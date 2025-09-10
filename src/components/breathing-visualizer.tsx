"use client";

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

type Phase = 'ready' | 'in' | 'hold' | 'out';

const phaseConfig = {
    ready: { duration: 3000, text: 'Get Ready...', scale: 'scale-75' },
    in: { duration: 4000, text: 'Breathe In', scale: 'scale-125' },
    hold: { duration: 4000, text: 'Hold', scale: 'scale-125' },
    out: { duration: 6000, text: 'Breathe Out', scale: 'scale-75' },
};

interface BreathingVisualizerProps {
    cycles: number;
    onFinish: () => void;
}

export function BreathingVisualizer({ cycles, onFinish }: BreathingVisualizerProps) {
    const [phase, setPhase] = useState<Phase>('ready');
    const [cycleCount, setCycleCount] = useState(0);

    useEffect(() => {
        if (cycleCount >= cycles) {
            setPhase('ready'); // reset to a final state
            setTimeout(onFinish, 2000); // Give a small delay before finishing
            return;
        }

        const timeout = setTimeout(() => {
            switch (phase) {
                case 'ready':
                    setPhase('in');
                    break;
                case 'in':
                    setPhase('hold');
                    break;
                case 'hold':
                    setPhase('out');
                    break;
                case 'out':
                    setCycleCount(prev => prev + 1);
                    setPhase('in');
                    break;
            }
        }, phaseConfig[phase].duration);

        return () => clearTimeout(timeout);

    }, [phase, cycleCount, cycles, onFinish]);
    
    const config = phaseConfig[phase];
    const isFinished = cycleCount >= cycles;
    
    return (
        <Card className="overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-[400px]">
                <div className="relative flex items-center justify-center w-64 h-64">
                    <div
                        className={`absolute w-full h-full bg-primary/20 rounded-full transition-transform duration-3000 ease-in-out ${config.scale}`}
                        style={{ transitionDuration: `${config.duration}ms` }}
                    />
                    <div className="z-10 text-center">
                        <p className="text-3xl font-bold tracking-tight text-primary">
                            {isFinished ? 'Finished!' : config.text}
                        </p>
                        {!isFinished && (
                            <p className="text-muted-foreground mt-2">
                                Cycle {cycleCount + 1} of {cycles}
                            </p>
                        )}
                    </div>
                </div>
                 <Button variant="ghost" onClick={onFinish} className="mt-8">
                    End Session
                </Button>
            </CardContent>
        </Card>
    );
}

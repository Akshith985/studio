
'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContactMessageAction } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2, CheckCircle, CalendarIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';


const initialState = {
  success: false,
  error: undefined,
  errors: undefined,
};

const counsellors = [
    {
        id: 'emily-carter',
        name: 'Dr. Emily Carter',
        specialty: 'Cognitive Behavioral Therapy',
        avatar: 'https://picsum.photos/100/100?random=5',
        'data-ai-hint': 'woman person',
    },
    {
        id: 'ben-adams',
        name: 'Dr. Ben Adams',
        specialty: 'Mindfulness & Stress Reduction',
        avatar: 'https://picsum.photos/100/100?random=6',
        'data-ai-hint': 'man person',
    }
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Booking Appointment...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Book Appointment
        </>
      )}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactMessageAction, initialState);
  const [date, setDate] = useState<Date | undefined>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setDate(undefined);
    }
  }, [state.success]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Book a Session</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose a counsellor, select a date, and leave a message to book your appointment.
        </p>
      </div>
      
      {state.success ? (
        <Alert variant="default" className="border-green-500 text-green-700">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Appointment Requested!</AlertTitle>
            <AlertDescription>
                Thank you for reaching out. The counsellor will confirm your appointment shortly.
            </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <form ref={formRef} action={formAction}>
            <CardHeader>
              <CardTitle>Booking Form</CardTitle>
              <CardDescription>
                Your request will be sent securely to the selected professional.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label>Choose a Counsellor</Label>
                    <RadioGroup name="counsellor" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {counsellors.map((counsellor) => (
                            <Label key={counsellor.id} htmlFor={counsellor.id} className="flex items-center gap-4 rounded-md border p-4 hover:bg-accent has-[input:checked]:bg-accent has-[input:checked]:border-primary cursor-pointer">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={counsellor.avatar} alt={counsellor.name} data-ai-hint={counsellor['data-ai-hint']} />
                                    <AvatarFallback>{counsellor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{counsellor.name}</p>
                                    <p className="text-sm text-muted-foreground">{counsellor.specialty}</p>
                                </div>
                                <RadioGroupItem value={counsellor.id} id={counsellor.id} className="sr-only" />
                            </Label>
                        ))}
                    </RadioGroup>
                    {state.errors?.counsellor && <p className="text-sm text-destructive">{state.errors.counsellor[0]}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="Enter your name" required />
                        {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="Enter your email" required />
                        {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
                            />
                        </PopoverContent>
                    </Popover>
                    <input type="hidden" name="date" value={date ? date.toISOString() : ''} />
                    {state.errors?.date && <p className="text-sm text-destructive">{state.errors.date[0]}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                    id="message"
                    name="message"
                    placeholder="Briefly describe what you'd like to discuss."
                    rows={4}
                    required
                    />
                    {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                </div>

                {state.error && !state.errors && (
                    <p className="text-sm text-destructive">{state.error}</p>
                )}
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}

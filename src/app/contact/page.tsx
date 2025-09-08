import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Contact a Counsellor</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Reach out for professional support. Fill out the form below, and we'll connect you with a counsellor.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>
            Your message will be sent securely to a qualified professional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe what you're going through. The more detail you can provide, the better our counsellors can assist you."
              rows={6}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

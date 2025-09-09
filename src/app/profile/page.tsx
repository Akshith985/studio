
// src/app/profile/page.tsx
'use client';

import { useAuth } from '@/context/auth-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Your Profile</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          View and manage your account details.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.email}</CardTitle>
              <CardDescription>Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>More profile information and settings can be added here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

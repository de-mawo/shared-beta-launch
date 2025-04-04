import React from 'react';
import { fetchEvent } from './fetch-event';
import { redirect } from 'next/navigation';
import { EventHeader } from './event-header';
import { ShareOptions } from './share-options';
import { GalleryGrid } from '@/components/dashboard/gallery-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCachedSession } from '@/lib/auth-utils';

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId?: string }>;
}) {
  const resolvedParams = await params;

  const session = await getCachedSession();

  if (!session) {
    redirect('/');
  }

  const eventId = resolvedParams.eventId || '';

  const userEvent = await fetchEvent({
    eventId,
    userId: session.user.id,
  });

  return (
    <>
      <EventHeader
        event={
          userEvent
            ? { id: userEvent.id, name: userEvent.title, code: userEvent.code }
            : null
        }
      />
      <Tabs defaultValue="galleries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="galleries">Galleries</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
          {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
        </TabsList>
        <TabsContent value="galleries" className="space-y-4">
          {userEvent && (
            <GalleryGrid
              eventId={userEvent.id}
              galleries={userEvent.galleries}
              className="mt-6"
            />
          )}
        </TabsContent>
        <TabsContent value="sharing" className="space-y-4">
          {userEvent && (
            <ShareOptions
              eventId={userEvent.id}
              eventCode={userEvent.code}
              qrCode={userEvent.qrCode}
              uploadUrl={userEvent.uploadUrl}
              memoryWallUrl={userEvent.memoryWallUrl}
            />
          )}
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          {/* Event settings form will go here */}
        </TabsContent>
      </Tabs>
    </>
  );
}

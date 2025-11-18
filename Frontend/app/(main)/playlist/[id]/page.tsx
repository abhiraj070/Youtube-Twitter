"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VideoCard from "@/components/video-card";
import { useVideos } from "@/lib/use-videos";

export default function PlaylistPage() {
  const params = useParams() as { id?: string };
  const { videos } = useVideos();

  // Mock playlist details based on id. In a real app, fetch by id.
  const playlistId = String(params.id ?? "default");
  const items = useMemo(
    () =>
      videos
        .filter((v) => v.playlistId === playlistId || playlistId === "default")
        .slice(0, 6),
    [videos, playlistId],
  );

  return (
    <main className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
      <Card className="h-fit sticky top-4 self-start transition-all">
        <CardHeader>
          <CardTitle>Playlist Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/abstract-channel-avatar.png"
              alt="Channel avatar"
              className="h-10 w-10 rounded-full ring-1 ring-border object-cover"
            />
            <div>
              <div className="text-sm font-medium">My Channel</div>
              <div className="text-xs text-muted-foreground">6 videos</div>
            </div>
          </div>
          <div className="text-sm">
            A curated set of videos. ID: {playlistId}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((v) => (
            <div
              key={v.id}
              className="transition-transform hover:-translate-y-0.5"
            >
              <VideoCard
                title={v.title}
                thumbnail={v.thumbnail}
                duration={v.duration}
                views={v.views}
                channelName={v.channelName}
                channelAvatar={v.channelAvatar}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

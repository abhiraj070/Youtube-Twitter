import { VideoCard } from "@/components/video-card";
import { mockVideos } from "@/lib/mock";

export default function LikedPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-balance text-xl font-semibold">Liked Videos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockVideos.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}

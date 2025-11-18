import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { mockVideos } from "@/lib/mock";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-balance text-xl font-semibold">Watch History</h2>
      <div className="space-y-3">
        {mockVideos.slice(0, 6).map((v, i) => (
          <Card key={v.id}>
            <CardContent className="flex items-center gap-3 p-3">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded">
                <Image
                  src={v.thumbnail || "/placeholder.svg"}
                  alt={`${v.title} thumbnail`}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{v.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {v.creator}
                </p>
                <p className="text-xs text-muted-foreground">
                  Watched {i + 1} day(s) ago
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

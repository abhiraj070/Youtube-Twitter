"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Video = {
  id: string
  title: string
  creator: string
  thumbnail: string
  avatar: string
  views: number
  uploadDate: string
}

function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n}`
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        {/* Using next/image for good perf. Placeholder URL with hard-coded query */}
        <Image
          src={video.thumbnail || `/placeholder.svg?height=360&width=640&query=video%20thumbnail`}
          alt={`${video.title} thumbnail`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-sm">{video.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between pt-0 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={video.avatar || `/placeholder.svg?height=40&width=40&query=channel%20avatar`}
              alt={`${video.creator} channel avatar`}
            />
            <AvatarFallback aria-hidden>{video.creator?.charAt(0) ?? "C"}</AvatarFallback>
          </Avatar>
          <span className="line-clamp-1">{video.creator}</span>
        </div>
        <div className="flex items-center gap-3">
          <span aria-label="views">{formatViews(video.views)} views</span>
          <span className="text-muted-foreground/80" aria-label="upload date">
            {formatDate(video.uploadDate)}
          </span>
          <Heart className="h-4 w-4" aria-hidden />
        </div>
      </CardContent>
    </Card>
  )
}

export default VideoCard

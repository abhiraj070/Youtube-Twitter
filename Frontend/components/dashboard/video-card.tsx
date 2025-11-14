'use client'

import { Heart, MessageCircle, Share2, Play } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface VideoCardProps {
  id: number
  title: string
  creator: string
  avatar: string
  thumbnail: string
  views: number
  likes: number
  comments: number
  duration: string
  isLiked: boolean
  onLike: () => void
  onPlay: () => void
}

export default function VideoCard({
  title,
  creator,
  avatar,
  thumbnail,
  views,
  likes,
  comments,
  duration,
  isLiked,
  onLike,
  onPlay,
}: VideoCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition cursor-pointer" onClick={onPlay}>
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden cursor-pointer">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 group-hover:bg-foreground/10 transition">
          <Play size={48} className="text-background opacity-0 group-hover:opacity-100 transition" fill="currentColor" />
        </div>
        <span className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs font-semibold px-2 py-1 rounded">
          {duration}
        </span>
      </div>

      {/* Content */}
      <div className="p-4" onClick={(e) => e.stopPropagation()}>
        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-3 cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar || "/placeholder.svg"} alt={creator} />
            <AvatarFallback>{creator.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{creator}</p>
            <p className="text-xs text-foreground/50">{views.toLocaleString()} views</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-3 line-clamp-2 text-sm">
          {title}
        </h3>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onLike()
            }}
            className={`flex-1 gap-1 cursor-pointer ${isLiked ? 'text-accent' : 'text-foreground/60'}`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-xs">{(likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 gap-1 text-foreground/60 cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <MessageCircle size={16} />
            <span className="text-xs">{comments.toLocaleString()}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 gap-1 text-foreground/60 cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <Share2 size={16} />
            <span className="text-xs">Share</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

'use client'

import VideoCard from '@/components/dashboard/video-card'
import { useState } from 'react'

const likedVideos = [
  {
    id: 1,
    title: 'Amazing sunset captured at the beach',
    creator: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    thumbnail: '/sunset-beach-tranquil.png',
    views: 2400,
    likes: 342,
    comments: 89,
    duration: '3:24',
  },
]

export default function LikedVideos() {
  const [liked, setLiked] = useState<Set<number>>(new Set([1]))

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Liked Videos</h1>
        {likedVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedVideos.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                isLiked={liked.has(video.id)}
                onLike={() => {
                  const newLiked = new Set(liked)
                  if (newLiked.has(video.id)) {
                    newLiked.delete(video.id)
                  } else {
                    newLiked.add(video.id)
                  }
                  setLiked(newLiked)
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-foreground/60 mb-4">No liked videos yet</p>
            <p className="text-sm text-foreground/40">Like videos to see them here</p>
          </div>
        )}
      </div>
    </div>
  )
}

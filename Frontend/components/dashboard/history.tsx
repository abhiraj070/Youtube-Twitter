'use client'

import VideoCard from '@/components/dashboard/video-card'
import { useState } from 'react'

const historyVideos = [
  {
    id: 2,
    title: 'Morning coding session - Build with React',
    creator: 'Dev Marcus',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    thumbnail: '/coding-development.jpg',
    views: 5200,
    likes: 721,
    comments: 156,
    duration: '15:42',
  },
  {
    id: 3,
    title: 'Travel vlog: Exploring Tokyo streets',
    creator: 'Alex Rivera',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    thumbnail: '/tokyo-street-travel.jpg',
    views: 8900,
    likes: 1203,
    comments: 287,
    duration: '12:15',
  },
]

export default function History() {
  const [liked, setLiked] = useState<Set<number>>(new Set())

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Watch History</h1>
        {historyVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyVideos.map((video) => (
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
            <p className="text-foreground/60 mb-4">No watch history yet</p>
            <p className="text-sm text-foreground/40">Videos you watch will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

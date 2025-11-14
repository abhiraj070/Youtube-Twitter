'use client'

import VideoCard from '@/components/dashboard/video-card'
import VideoPlayerModal from '@/components/dashboard/video-player-modal'
import { useState } from 'react'

// Mock video data
const mockVideos = [
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
  {
    id: 4,
    title: 'Quick recipe: 5-minute pasta',
    creator: 'Chef Julia',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=julia',
    thumbnail: '/pasta-cooking-recipe.jpg',
    views: 3100,
    likes: 456,
    comments: 92,
    duration: '5:30',
  },
]

export default function Feed() {
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [selectedVideo, setSelectedVideo] = useState<typeof mockVideos[0] | null>(null)

  return (
    <>
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground mb-8">For You</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockVideos.map((video) => (
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
                onPlay={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video player modal */}
      <VideoPlayerModal
        isOpen={selectedVideo !== null}
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  )
}

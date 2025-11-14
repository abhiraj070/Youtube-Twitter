'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Share2, UserPlus } from 'lucide-react'
import VideoCard from '@/components/dashboard/video-card'

interface CreatorProfileProps {
  username: string
}

const creatorVideos = [
  {
    id: 1,
    title: 'Top 10 React hooks explained',
    creator: 'Dev Guru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru',
    thumbnail: '/placeholder.svg?key=creator1',
    views: 45000,
    likes: 8934,
    comments: 1240,
    duration: '22:15',
  },
  {
    id: 2,
    title: 'Building a full-stack app in 1 hour',
    creator: 'Dev Guru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru',
    thumbnail: '/placeholder.svg?key=creator2',
    views: 62000,
    likes: 12400,
    comments: 2100,
    duration: '58:30',
  },
  {
    id: 3,
    title: 'Web dev mistakes I made in my first year',
    creator: 'Dev Guru',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guru',
    thumbnail: '/placeholder.svg?key=creator3',
    views: 38000,
    likes: 7200,
    comments: 890,
    duration: '18:45',
  },
]

const creatorTweets = [
  {
    id: 1,
    content: 'Just hit 100K followers! Thank you all for the support. New video dropping tomorrow!',
    timestamp: '5 hours ago',
    likes: 2340,
    replies: 456,
  },
  {
    id: 2,
    content: 'Pro tip: Always test your code in production... just kidding, test locally first 😄',
    timestamp: '1 day ago',
    likes: 5600,
    replies: 1200,
  },
]

export default function CreatorProfile({ username }: CreatorProfileProps) {
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="h-40 md:h-56 bg-gradient-to-r from-accent/40 to-accent/20" />

      {/* Profile Section */}
      <div className="px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 -mt-20 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=guru" alt={username} />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 pt-6 md:pt-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Dev Guru</h1>
                  <p className="text-foreground/60 mt-1">@{username}</p>
                  <p className="text-foreground/70 mt-3 text-sm">Coding tutorials and web development tips. Building in public.</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className={`gap-2 ${isFollowing ? 'bg-muted text-foreground' : 'bg-accent text-accent-foreground'}`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <UserPlus size={16} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6">
                <div>
                  <p className="text-xl font-bold text-foreground">342</p>
                  <p className="text-sm text-foreground/60">Videos</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">102.5K</p>
                  <p className="text-sm text-foreground/60">Followers</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">1.2K</p>
                  <p className="text-sm text-foreground/60">Following</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">8.9M</p>
                  <p className="text-sm text-foreground/60">Total Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-border pt-8">
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="tweets">Tweets</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creatorVideos.map((video) => (
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
              </TabsContent>

              <TabsContent value="tweets" className="mt-8">
                <div className="space-y-4 max-w-2xl">
                  {creatorTweets.map((tweet) => (
                    <div key={tweet.id} className="p-4 bg-card border border-border rounded-lg hover:border-accent transition">
                      <p className="text-foreground mb-3">{tweet.content}</p>
                      <p className="text-xs text-foreground/50 mb-3">{tweet.timestamp}</p>
                      <div className="flex gap-6">
                        <button className="text-sm text-foreground/60 hover:text-accent transition">
                          Like ({tweet.likes})
                        </button>
                        <button className="text-sm text-foreground/60 hover:text-accent transition">
                          Reply ({tweet.replies})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

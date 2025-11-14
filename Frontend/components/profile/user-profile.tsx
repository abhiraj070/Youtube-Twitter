'use client'

import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit2, Share2, Settings } from 'lucide-react'
import VideoCard from '@/components/dashboard/video-card'

const userVideos = [
  {
    id: 1,
    title: 'My first vlog - getting started',
    creator: 'You',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    thumbnail: '/placeholder.svg?key=profile1',
    views: 1200,
    likes: 245,
    comments: 42,
    duration: '8:30',
  },
  {
    id: 2,
    title: 'Weekend adventure highlights',
    creator: 'You',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    thumbnail: '/placeholder.svg?key=profile2',
    views: 3400,
    likes: 612,
    comments: 128,
    duration: '6:15',
  },
]

const userTweets = [
  {
    id: 1,
    content: 'Just launched my new project! Feeling excited about what\'s next 🚀',
    timestamp: '2 hours ago',
    likes: 234,
    replies: 45,
  },
  {
    id: 2,
    content: 'Anyone else love debugging at midnight? Just me? Okay...',
    timestamp: '1 day ago',
    likes: 156,
    replies: 28,
  },
  {
    id: 3,
    content: 'The best part about building is seeing it come to life',
    timestamp: '3 days ago',
    likes: 489,
    replies: 94,
  },
]

export default function UserProfile() {
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="h-40 md:h-56 bg-gradient-to-r from-accent/30 to-accent/10" />

      {/* Profile Section */}
      <div className="px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-6 -mt-20 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="Profile" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="flex-1 pt-6 md:pt-12">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Your Name</h1>
                  <p className="text-foreground/60 mt-1">@yourhandle</p>
                  <p className="text-foreground/70 mt-3 text-sm">Passion meets creativity. Sharing my journey one video at a time.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit2 size={16} />
                    Edit Profile
                  </Button>
                  <Button variant="ghost" size="icon" className="text-foreground/60">
                    <Settings size={18} />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6">
                <div>
                  <p className="text-xl font-bold text-foreground">1.2K</p>
                  <p className="text-sm text-foreground/60">Videos</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">45.8K</p>
                  <p className="text-sm text-foreground/60">Followers</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">328</p>
                  <p className="text-sm text-foreground/60">Following</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">2.3M</p>
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
                  {userVideos.map((video) => (
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
                  {userTweets.map((tweet) => (
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

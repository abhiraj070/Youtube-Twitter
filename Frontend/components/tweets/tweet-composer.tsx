'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, Trash2, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Tweet {
  id: number
  content: string
  timestamp: string
  likes: number
  replies: number
  userLiked: boolean
}

const initialTweets: Tweet[] = [
  {
    id: 1,
    content: 'Just launched my new project! Feeling excited about what\'s next 🚀',
    timestamp: '2 hours ago',
    likes: 234,
    replies: 45,
    userLiked: false,
  },
  {
    id: 2,
    content: 'Anyone else love debugging at midnight? Just me? Okay...',
    timestamp: '1 day ago',
    likes: 156,
    replies: 28,
    userLiked: false,
  },
  {
    id: 3,
    content: 'The best part about building is seeing it come to life',
    timestamp: '3 days ago',
    likes: 489,
    replies: 94,
    userLiked: true,
  },
]

export default function TweetComposer() {
  const [tweets, setTweets] = useState(initialTweets)
  const [content, setContent] = useState('')
  const [posting, setPosting] = useState(false)

  const handlePostTweet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setPosting(true)
    // Simulate API call
    setTimeout(() => {
      const newTweet: Tweet = {
        id: tweets.length + 1,
        content,
        timestamp: 'now',
        likes: 0,
        replies: 0,
        userLiked: false,
      }
      setTweets([newTweet, ...tweets])
      setContent('')
      setPosting(false)
    }, 500)
  }

  const toggleLike = (id: number) => {
    setTweets(tweets.map(tweet =>
      tweet.id === id
        ? {
            ...tweet,
            userLiked: !tweet.userLiked,
            likes: tweet.userLiked ? tweet.likes - 1 : tweet.likes + 1,
          }
        : tweet
    ))
  }

  const deleteTweet = (id: number) => {
    setTweets(tweets.filter(tweet => tweet.id !== id))
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Tweets</h1>

        {/* Composer */}
        <form onSubmit={handlePostTweet} className="mb-8">
          <div className="p-4 bg-card border border-border rounded-xl">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="You" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-foreground placeholder:text-foreground/50 resize-none focus:outline-none text-lg"
                  rows={3}
                />
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={!content.trim() || posting}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-6"
                  >
                    {posting ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Tweet Feed */}
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition group">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" alt="You" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">You</p>
                      <p className="text-sm text-foreground/50">@yourhandle • {tweet.timestamp}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition">
                      <MoreVertical size={16} className="text-foreground/50" />
                    </button>
                  </div>
                  <p className="text-foreground mt-3">{tweet.content}</p>
                  <div className="flex gap-8 mt-4 text-sm text-foreground/50">
                    <button className="flex items-center gap-2 hover:text-accent transition">
                      <MessageCircle size={16} />
                      {tweet.replies}
                    </button>
                    <button
                      onClick={() => toggleLike(tweet.id)}
                      className={`flex items-center gap-2 transition ${
                        tweet.userLiked ? 'text-accent' : 'hover:text-accent'
                      }`}
                    >
                      <Heart size={16} fill={tweet.userLiked ? 'currentColor' : 'none'} />
                      {tweet.likes}
                    </button>
                    <button className="flex items-center gap-2 hover:text-accent transition">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => deleteTweet(tweet.id)}
                  className="opacity-0 group-hover:opacity-100 text-foreground/50 hover:text-destructive transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

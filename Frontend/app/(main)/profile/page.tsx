"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { VideoCard } from "@/components/video-card"
import { mockVideos, mockPlaylists, mockTweets, mockFollowing } from "@/lib/mock"
import { cn } from "@/lib/utils"
import { EditProfileDialog } from "@/components/edit-profile-dialog"

type TabKey = "videos" | "playlists" | "tweets" | "following"

export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("videos")
  const [tweets, setTweets] = useState(mockTweets)
  const [tweetText, setTweetText] = useState("")
  const { toast } = useToast()
  const [openEdit, setOpenEdit] = useState(false)

  function followToggle() {
    toast({ title: "Followed", description: "You are now following @you" })
  }

  function postTweet() {
    if (!tweetText.trim()) return
    const newTweet = {
      id: Math.random().toString(36).slice(2),
      content: tweetText.trim(),
      createdAt: new Date().toISOString(),
    }
    setTweets([newTweet, ...tweets])
    setTweetText("")
    toast({ title: "Tweet posted" })
  }

  function deleteTweet(id: string) {
    setTweets((prev) => prev.filter((t) => t.id !== id))
    toast({ title: "Tweet deleted" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="overflow-hidden rounded-lg border bg-card">
        <div className="relative h-48 w-full">
          <Image
            src="/abstract-profile-cover.png"
            alt="Profile cover"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="px-4 pb-4 pt-0 md:px-6">
          <div className="relative -mt-12 flex flex-col items-center text-center">
            <Avatar className="relative z-10 h-24 w-24 rounded-full ring-4 ring-background shadow-md">
              <AvatarImage src="/stylized-user-avatar.png" alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h1 className="mt-3 text-xl font-semibold leading-tight md:text-2xl">Your Name</h1>
            <p className="text-sm text-muted-foreground">@you</p>
            <p className="mt-2 max-w-prose text-pretty text-sm text-muted-foreground">
              Short bio goes here. Tell the world who you are.
            </p>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                <strong className="text-foreground">1,234</strong> Followers
              </span>
              <span>
                <strong className="text-foreground">312</strong> Following
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button onClick={followToggle}>Follow</Button>
              <Button variant="secondary" onClick={() => setOpenEdit(true)}>
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 md:justify-start">
            {(["videos", "playlists", "tweets", "following"] as TabKey[]).map((k) => (
              <button
                key={k}
                className={cn(
                  "rounded-md px-3 py-1 text-sm hover:bg-accent",
                  tab === k && "bg-accent text-accent-foreground",
                )}
                onClick={() => setTab(k)}
                aria-current={tab === k ? "page" : undefined}
              >
                {k[0].toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      {tab === "videos" && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </section>
      )}

      {tab === "playlists" && (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockPlaylists.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={p.thumbnail || "/placeholder.svg"}
                  alt={`${p.title} playlist`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{p.title}</h3>
                    <p className="text-xs text-muted-foreground">{p.count} videos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {tab === "tweets" && (
        <section className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <label htmlFor="tweet" className="sr-only">
                Write a tweet
              </label>
              <textarea
                id="tweet"
                className="w-full resize-none rounded-md border bg-background p-3 text-sm outline-none focus:ring-2"
                placeholder="What's happening?"
                rows={3}
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <Button onClick={postTweet}>Post</Button>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {tweets.map((t) => (
              <Card key={t.id}>
                <CardContent className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm">{t.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteTweet(t.id)}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {tab === "following" && (
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {mockFollowing.map((f) => (
            <Card key={f.id}>
              <CardContent className="flex items-center gap-3 p-4">
                <Image
                  src={f.avatar || "/placeholder.svg"}
                  alt={`${f.name} avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      {/* Edit Profile Dialog */}
      <EditProfileDialog open={openEdit} onOpenChange={setOpenEdit} />
    </div>
  )
}

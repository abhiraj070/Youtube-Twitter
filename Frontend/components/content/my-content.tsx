'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Edit2, Trash2, Eye, MoreVertical } from 'lucide-react'
import Link from 'next/link'

interface Video {
  id: number
  title: string
  thumbnail: string
  views: number
  likes: number
  date: string
  status: 'published' | 'draft'
}

const myVideos: Video[] = [
  {
    id: 1,
    title: 'My first vlog - getting started',
    thumbnail: '/placeholder.svg?key=myvideo1',
    views: 1200,
    likes: 245,
    date: '2024-11-10',
    status: 'published',
  },
  {
    id: 2,
    title: 'Weekend adventure highlights',
    thumbnail: '/placeholder.svg?key=myvideo2',
    views: 3400,
    likes: 612,
    date: '2024-11-08',
    status: 'published',
  },
  {
    id: 3,
    title: 'Untitled Project',
    thumbnail: '/placeholder.svg?key=myvideo3',
    views: 0,
    likes: 0,
    date: '2024-11-05',
    status: 'draft',
  },
]

export default function MyContent() {
  const [videos, setVideos] = useState(myVideos)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setVideos(videos.filter(v => v.id !== id))
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">My Content</h1>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            <Link href="/dashboard/upload">
              Create New
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="mt-6">
            <div className="space-y-3">
              {videos.filter(v => v.status === 'published').map((video) => (
                <div key={video.id} className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-accent transition group">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{video.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-foreground/60">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {video.views.toLocaleString()} views
                      </span>
                      <span>{video.likes.toLocaleString()} likes</span>
                      <span>{new Date(video.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(video.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drafts" className="mt-6">
            <div className="space-y-3">
              {videos.filter(v => v.status === 'draft').map((video) => (
                <div key={video.id} className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-accent transition group">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-24 h-24 object-cover rounded-lg opacity-60"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground truncate">{video.title}</h3>
                      <span className="text-xs bg-muted text-foreground/60 px-2 py-1 rounded">Draft</span>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-foreground/60">
                      <span>Created {new Date(video.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(video.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { mockVideos } from "@/lib/mock"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MyContentPage() {
  const [videos, setVideos] = useState(mockVideos)
  const { toast } = useToast()

  function deleteVideo(id: string) {
    setVideos((prev) => prev.filter((v) => v.id !== id))
    toast({ title: "Video deleted" })
  }

  function uploadVideo() {
    toast({ title: "Upload", description: "Mock upload started..." })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-balance text-xl font-semibold">My Content</h2>
        <Button onClick={uploadVideo} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={v.thumbnail || "/placeholder.svg"}
                alt={`${v.title} thumbnail`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-1 text-sm">{v.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-end pt-0">
              <Button variant="destructive" size="sm" onClick={() => deleteVideo(v.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

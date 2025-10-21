"use client"

import { useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "v0.videos"

const seed = [
  {
    id: "v1",
    title: "Intro to the Platform",
    description: "A quick walkthrough of features.",
    thumbnail: "/video-thumb-intro.jpg",
    channelName: "My Channel",
    channelAvatar: "/abstract-channel-avatar.png",
    views: 12345,
    duration: "12:34",
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "v2",
    title: "Advanced Editing Tips",
    description: "Make the most of your edits.",
    thumbnail: "/video-thumb-editing.jpg",
    channelName: "My Channel",
    channelAvatar: "/abstract-channel-avatar.png",
    views: 56789,
    duration: "08:12",
    published: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "v3",
    title: "Behind the Scenes",
    description: "How we plan and shoot videos.",
    thumbnail: "/video-thumb-bts.jpg",
    channelName: "My Channel",
    channelAvatar: "/abstract-channel-avatar.png",
    views: 9012,
    duration: "05:47",
    published: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
]

function read() {
  if (typeof window === "undefined") return seed
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : seed
  } catch {
    return seed
  }
}

function write(videos) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
  window.dispatchEvent(new CustomEvent("videos:changed"))
}

export function useVideos() {
  const [videos, setVideos] = useState(() => read())

  useEffect(() => {
    const handler = () => setVideos(read())
    window.addEventListener("storage", handler)
    window.addEventListener("videos:changed", handler)
    return () => {
      window.removeEventListener("storage", handler)
      window.removeEventListener("videos:changed", handler)
    }
  }, [])

  const stats = useMemo(() => {
    const totalViews = videos.reduce((acc, v) => acc + v.views, 0)
    const totalLikes = Math.round(totalViews * 0.08)
    const subscribers = 4200
    return { totalViews, totalLikes, subscribers }
  }, [videos])

  function addVideo(input) {
    const next = {
      id: `v_${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      views: 0,
      published: false,
      channelName: "My Channel",
      channelAvatar: "/abstract-channel-avatar.png",
      ...input,
    }
    const newList = [next, ...read()]
    write(newList)
  }

  function updateVideo(id, patch) {
    const list = read().map((v) => (v.id === id ? { ...v, ...patch } : v))
    write(list)
  }

  function deleteVideo(id) {
    const list = read().filter((v) => v.id !== id)
    write(list)
  }

  function togglePublished(id) {
    const list = read().map((v) => (v.id === id ? { ...v, published: !v.published } : v))
    write(list)
  }

  return { videos, stats, addVideo, updateVideo, deleteVideo, togglePublished }
}

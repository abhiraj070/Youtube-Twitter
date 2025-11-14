'use client'

import { X, Pause, Play, Volume2, VolumeX, Maximize } from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import CommentSection from '@/components/comments/comment-section'

interface VideoPlayerModalProps {
  isOpen: boolean
  video: {
    id: number
    title: string
    creator: string
    avatar: string
    thumbnail: string
    views: number
    likes: number
    comments: number
    duration: string
  } | null
  onClose: () => void
}

export default function VideoPlayerModal({ isOpen, video, onClose }: VideoPlayerModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  if (!isOpen || !video) return null

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden flex flex-col">
        {/* Close button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground truncate">{video.title}</h2>
          <button onClick={onClose} className="cursor-pointer p-1 hover:bg-muted rounded transition">
            <X size={24} className="text-foreground/70" />
          </button>
        </div>

        {/* Video player */}
        <div className="bg-black relative aspect-video">
          <video
            ref={videoRef}
            src="/placeholder.mp4"
            className="w-full h-full"
            onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
          />

          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={handlePlayPause}>
            {!isPlaying && (
              <button className="cursor-pointer bg-accent/80 hover:bg-accent p-3 rounded-full transition">
                <Play size={48} className="text-accent-foreground" fill="currentColor" />
              </button>
            )}
          </div>

          {/* Player controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-2">
            <button
              onClick={handlePlayPause}
              className="cursor-pointer hover:bg-white/20 p-2 rounded transition"
            >
              {isPlaying ? (
                <Pause size={20} className="text-white" />
              ) : (
                <Play size={20} className="text-white" fill="white" />
              )}
            </button>

            <div className="flex-1 bg-white/20 rounded-full h-1 cursor-pointer">
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: `${(currentTime / 120) * 100}%` }}
              />
            </div>

            <span className="text-white text-xs">{Math.floor(currentTime)}s / 120s</span>

            <button
              onClick={handleMute}
              className="cursor-pointer hover:bg-white/20 p-2 rounded transition"
            >
              {isMuted ? (
                <VolumeX size={20} className="text-white" />
              ) : (
                <Volume2 size={20} className="text-white" />
              )}
            </button>

            <button
              onClick={handleFullscreen}
              className="cursor-pointer hover:bg-white/20 p-2 rounded transition"
            >
              <Maximize size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Video info and comments */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
            <p className="text-sm text-foreground/60">{video.views.toLocaleString()} views • {video.creator}</p>
          </div>

          {/* Comments section */}
          <CommentSection videoId={video.id} />
        </div>
      </div>
    </div>
  )
}

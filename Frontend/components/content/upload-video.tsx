'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X } from 'lucide-react'

export default function UploadVideo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    // TODO: Implement file upload
    setTimeout(() => {
      setUploading(false)
      setTitle('')
      setDescription('')
      setFile(null)
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-8">Upload Video</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition">
            {!file ? (
              <label className="cursor-pointer flex flex-col items-center gap-2">
                <Upload size={40} className="text-foreground/60" />
                <p className="text-foreground font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-foreground/60">MP4, WebM up to 1GB</p>
                <Input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-foreground font-medium">{file.name}</p>
                  <p className="text-sm text-foreground/60">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-foreground/60 hover:text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Video Title</label>
            <Input
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Add details about your video..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button type="submit" disabled={uploading || !file} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              {uploading ? 'Uploading...' : 'Publish Video'}
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

"use client"

import AppShell from "@/components/app-shell"
import { VideoCard } from "@/components/video-card"
import { mockVideos } from "@/lib/mock"
import { useState } from "react"
import { DashboardActions } from "@/components/dashboard-actions"
import { UploadVideoDialog } from "@/components/upload-video-dialog"

export default function Page() {
  const [uploadOpen, setUploadOpen] = useState(false)

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-balance text-2xl font-semibold md:text-3xl">All Videos</h1>
            <p className="text-sm text-muted-foreground">Browse your uploaded content</p>
          </div>
          <div className="flex items-center gap-2">
            <DashboardActions onQuickUpload={() => setUploadOpen(true)} />
          </div>
        </header>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockVideos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </section>
        <UploadVideoDialog open={uploadOpen} onOpenChange={setUploadOpen} />
      </div>
    </AppShell>
  )
}

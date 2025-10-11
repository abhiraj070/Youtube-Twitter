"use client"
import type React from "react"
import { TopNav } from "./top-nav"
import { Sidebar } from "./sidebar"
import { BottomNav } from "./bottom-nav"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <div className="mx-auto max-w-7xl h-[calc(100vh-3.5rem)] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] h-full">
          <Sidebar />
          <main className="h-full overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

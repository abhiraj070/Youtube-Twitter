'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, History, Video, Plus, LogOut, FileText, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Liked Videos', icon: Heart, href: '/dashboard/liked' },
  { label: 'History', icon: History, href: '/dashboard/history' },
  { label: 'My Content', icon: BarChart3, href: '/dashboard/my-content' },
  { label: 'Tweets', icon: FileText, href: '/dashboard/tweets' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full p-6">
      <Link href="/dashboard" className="flex items-center gap-2 mb-8 font-bold text-xl text-foreground">
        <div className="w-8 h-8 bg-accent rounded-full"></div>
        <span>social</span>
      </Link>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              }`}>
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      <div className="space-y-3 pt-6 border-t border-border">
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
          <Link href="/dashboard/upload">
            <Plus size={18} />
            New Video
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-foreground/70 hover:text-foreground gap-2">
          <LogOut size={18} />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

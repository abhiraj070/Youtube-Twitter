"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, History, Video, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/liked", label: "Liked Videos", icon: Heart },
  { href: "/history", label: "History", icon: History },
  { href: "/my-content", label: "My Content", icon: Video },
  { href: "/subscribers", label: "Subscribers", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-sidebar bg-linear-to-b from-sidebar to-sidebar/80 md:block sticky top-14 h-[calc(100vh-3.5rem)]">
      <nav className="flex h-full flex-col gap-1 p-3">
        {items.map((item) => {
          const Icon = item.icon
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-sidebar-accent hover:translate-x-0.5 cursor-pointer",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary pl-1.5"
                  : "pl-3",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

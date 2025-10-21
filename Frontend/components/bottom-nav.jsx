"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, History, Video, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/liked", label: "Liked", icon: Heart },
  { href: "/history", label: "History", icon: History },
  { href: "/my-content", label: "Content", icon: Video },
  { href: "/subscribers", label: "Subs", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-6">
        {items.map((item) => {
          const Icon = item.icon
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex h-12 flex-col items-center justify-center text-xs cursor-pointer transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

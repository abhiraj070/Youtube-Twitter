"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart3, ListVideo, PlusCircle, PanelRight } from "lucide-react"

type Props = {
  onQuickUpload?: () => void
}

export function DashboardActions({ onQuickUpload }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="flex items-center gap-2" aria-haspopup="menu">
          <PanelRight className="h-4 w-4" />
          Dashboard
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard")
            setOpen(false)
          }}
        >
          <PanelRight className="mr-2 h-4 w-4" />
          Open Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard#analytics")
            setOpen(false)
          }}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard#videos")
            setOpen(false)
          }}
        >
          <ListVideo className="mr-2 h-4 w-4" />
          Manage Videos
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onQuickUpload?.()
            setOpen(false)
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Quick Upload
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DashboardActions

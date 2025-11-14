import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { mockSubscribers } from "@/lib/mock"

export default function SubscribersPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-balance text-xl font-semibold">Subscribers</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {mockSubscribers.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center gap-3 p-4">
              <Image
                src={s.avatar || "/placeholder.svg"}
                alt={`${s.name} avatar`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.bio}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

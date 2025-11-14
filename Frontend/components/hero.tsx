import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PlayCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Share Your Moments with the World
            </h1>
            <p className="text-lg text-foreground/60 text-balance">
              Connect with millions through short videos and engaging content. Express yourself, discover creators, and build your community on our modern social platform.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features" className="flex items-center gap-2">
                  <PlayCircle size={20} />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/modern-video-platform-interface.jpg"
                alt="Platform preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

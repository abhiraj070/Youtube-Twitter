import { Video, Users, Zap } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: 'Create & Share',
    description: 'Share short videos and thoughts in seconds. Express yourself with powerful creative tools.',
  },
  {
    icon: Users,
    title: 'Connect & Engage',
    description: 'Build relationships with creators worldwide. Like, comment, and share meaningful content.',
  },
  {
    icon: Zap,
    title: 'Discover Trending',
    description: 'Find viral content and trending creators. Never miss what\'s happening right now.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need
          </h2>
          <p className="text-lg text-foreground/60 text-balance">
            Our platform is built for creators, by creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="p-8 rounded-xl bg-background border border-border hover:border-accent transition">
                <Icon size={32} className="text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/60">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-foreground/60 mb-8 text-balance">
          Join thousands of creators building their community. Start sharing your stories today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/signup">Create Account</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

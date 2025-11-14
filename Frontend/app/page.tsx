import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import Features from '@/components/features'
import CTA from '@/components/cta'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}

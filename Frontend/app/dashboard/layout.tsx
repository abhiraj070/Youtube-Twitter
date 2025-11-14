import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Social',
  description: 'Your personalized video feed and content',
}

export default function DashboardLayoutRoot({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

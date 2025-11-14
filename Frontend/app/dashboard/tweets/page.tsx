import DashboardLayout from '@/components/dashboard/dashboard-layout'
import TweetComposer from '@/components/tweets/tweet-composer'

export default function TweetsPage() {
  return (
    <DashboardLayout>
      <TweetComposer />
    </DashboardLayout>
  )
}

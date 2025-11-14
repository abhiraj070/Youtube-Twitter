import DashboardLayout from '@/components/dashboard/dashboard-layout'
import CreatorProfile from '@/components/profile/creator-profile'

export default function CreatorProfilePage({ params }: { params: { username: string } }) {
  return (
    <DashboardLayout>
      <CreatorProfile username={params.username} />
    </DashboardLayout>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-balance text-xl font-semibold">Settings</h2>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Toggle dark mode</span>
          <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  )
}

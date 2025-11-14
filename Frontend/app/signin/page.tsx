import SignInForm from '@/components/auth/signin-form'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent rounded-full"></div>
            <span className="font-bold text-xl text-foreground">social</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
          <p className="text-foreground/60 mt-2">Welcome back to your community</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

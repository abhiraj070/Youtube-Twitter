"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"
import { useRouter } from "next/navigation"


export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [username, setusername] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string; username?: string; avatar?: string}>({})
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  function validate() {
    const errs: typeof errors = {}
    if (name.trim().length < 2) errs.name = "Name is too short."
    if (!email.includes("@")) errs.email = "Enter a valid email."
    if (password.length < 6) errs.password = "Password must be at least 6 characters."
    if (confirm !== password) errs.confirm = "Passwords do not match."
    if (!username.trim()) {
      errs.username = "Username is required"
    } else if (username.length < 3) {
      errs.username = "Username must be at least 3 characters"
    }
    if (!avatarFile) {
      errs.avatar = "Avatar is required"
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus(null)
    setIsSubmitting(true)
    if (!validate()) {
      setIsSubmitting(false)
      setStatus("Validation failed — check the form fields")
      return
    }
    try {
        // backend expects multipart/form-data because it uses multer for register route
        const form = new FormData()
        form.append("email", email)
        form.append("password", password)
        form.append("fullName", name)
        form.append("username", username)
        if (avatarFile) form.append("avatar", avatarFile)
        if (coverFile) form.append("coverImage", coverFile)
          
        const res = await axios.post("/api/v1/users/register", form)
        setStatus("Signup successful — redirecting…")
        toast({ title: "Signed up", description: "Welcome aboard!" })
        // wait a short moment so the toast can render, then navigate
        await new Promise((r) => setTimeout(r, 300))
        router.push("/")
    } catch (err: any) {
        setStatus("Signup failed")
        if (err?.response?.data?.error) {
          const errorMessage = err.response.data.error
          // Check if backend mentioned 'username' in its error message
          if (errorMessage.toLowerCase().includes("username")) {
            setErrors((prev) => ({ ...prev, username: errorMessage }))
          } else {
            toast({
              title: "Signup failed",
              description: errorMessage,
              variant: "destructive",
            })
          }
        } 
      } finally {
          setIsSubmitting(false)
        }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-sm animate-in fade-in-50">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm">
                Full Name
              </label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="username" className="mb-1 block text-sm">
                Username
              </label>
              <Input
                id="username"
                type="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              {errors.username && <p className="mt-1 text-xs text-destructive">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="avatar" className="mb-1 block text-sm">
                Avatar (required)
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                className="block w-full"
              />
              {errors.avatar && <p className="mt-1 text-xs text-destructive">{errors.avatar}</p>}
            </div>
            <div>
              <label htmlFor="coverImage" className="mb-1 block text-sm">
                Cover Image (optional)
              </label>
              <input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files ? e.target.files[0] : null)}
                className="block w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirm" className="mb-1 block text-sm">
                Confirm Password
              </label>
              <Input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={!!errors.confirm}
              />
              {errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm}</p>}
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create account"}
            </Button>
            {status && <p className="mt-2 text-sm text-muted-foreground">{status}</p>}
          </form>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Already have an account?&nbsp;
          <Link href="/login" className="text-primary underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
  }

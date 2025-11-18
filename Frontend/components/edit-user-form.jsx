"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const LS_KEY = "v0:user-details";

export function EditUserForm() {
  const { toast } = useToast();
  const [details, setDetails] = useState({
    name: "Your Name",
    username: "you",
    bio: "Short bio goes here. Tell the world who you are.",
    email: "you@example.com",
    website: "https://example.com",
    avatarUrl: "/stylized-user-avatar.png",
  });
  const [avatarFile, setAvatarFile] = useState(null);

  const previewUrl = useMemo(() => {
    if (avatarFile) return URL.createObjectURL(avatarFile);
    return details.avatarUrl || "/placeholder-user.jpg";
  }, [avatarFile, details.avatarUrl]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setDetails((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    return () => {
      if (avatarFile) URL.revokeObjectURL(previewUrl);
    };
  }, [avatarFile, previewUrl]);

  function handleChange(key, value) {
    setDetails((d) => ({ ...d, [key]: value }));
  }

  function onAvatarChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  }

  function onReset() {
    setAvatarFile(null);
    setDetails({
      name: "Your Name",
      username: "you",
      bio: "Short bio goes here. Tell the world who you are.",
      email: "you@example.com",
      website: "https://example.com",
      avatarUrl: "/stylized-user-avatar.png",
    });
    toast({ title: "Reset", description: "Restored default user details." });
  }

  function onSave(e) {
    e.preventDefault();

    const toStore = {
      ...details,
      avatarUrl: avatarFile ? previewUrl : details.avatarUrl,
    };

    try {
      localStorage.setItem(LS_KEY, JSON.stringify(toStore));
      setDetails(toStore);
      toast({
        title: "Saved",
        description: "Your profile details were updated.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Unable to save details. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-4 md:p-6">
        <form
          onSubmit={onSave}
          className="space-y-6"
          aria-labelledby="edit-user-title"
        >
          <h2 id="edit-user-title" className="text-lg font-semibold">
            Edit your details
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={previewUrl || "/placeholder.svg"}
                alt="Current avatar preview"
              />
              <AvatarFallback aria-hidden>U</AvatarFallback>
            </Avatar>
            <div className="grid gap-2">
              <Label htmlFor="avatar">Profile photo</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                aria-describedby="avatar-help"
              />
              <p id="avatar-help" className="text-xs text-muted-foreground">
                JPG, PNG up to a few MB. Preview shown instantly.
              </p>
            </div>
          </div>

          {/* Name + Username */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={details.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={details.username}
                onChange={(e) =>
                  handleChange("username", e.target.value.replace(/\s+/g, ""))
                }
                placeholder="you"
                aria-describedby="username-help"
              />
              <p id="username-help" className="text-xs text-muted-foreground">
                Your public handle. No spaces.
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={details.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              placeholder="Tell the world who you are."
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={details.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={details.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onReset}>
              Reset
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

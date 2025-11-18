"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVideos } from "@/lib/use-videos";

export function UploadVideoDialog({ open, onOpenChange }) {
  const { addVideo } = useVideos();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumb, setThumb] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);

  function reset() {
    setTitle("");
    setDescription("");
    setThumb("");
    setProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setThumb(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function onUpload() {
    if (!title.trim() || !description.trim() || !thumb) {
      toast({
        title: "Missing fields",
        description: "Please fill all fields and add a thumbnail.",
        variant: "destructive",
      });
      return;
    }
    setProgress(10);
    await new Promise((r) => setTimeout(r, 300));
    setProgress(55);
    await new Promise((r) => setTimeout(r, 400));
    setProgress(100);

    addVideo({
      title,
      description,
      thumbnail: thumb,
      duration: "00:30",
    });

    toast({
      title: "Uploaded",
      description: "Your video was uploaded successfully.",
    });
    window.dispatchEvent(new CustomEvent("video:uploaded"));
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload New Video</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Video Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about your video"
            />
          </div>
          <div className="grid gap-2">
            <Label>Thumbnail Upload</Label>
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {thumb ? (
              <img
                src={thumb || "/placeholder.svg"}
                alt="Thumbnail preview"
                className="mt-2 h-28 w-full rounded-md object-cover ring-1 ring-border"
              />
            ) : (
              <div className="mt-2 h-28 w-full rounded-md bg-muted/50 ring-1 ring-border flex items-center justify-center text-muted-foreground">
                Select an image to preview
              </div>
            )}
          </div>
          {progress > 0 && (
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              onOpenChange(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button onClick={onUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

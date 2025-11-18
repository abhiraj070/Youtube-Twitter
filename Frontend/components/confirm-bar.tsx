"use client";

import { Button } from "@/components/ui/button";

type Props = {
  text: string;
  onYes: () => void;
  onCancel: () => void;
};

export function ConfirmBar({ text, onYes, onCancel }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto w-[min(680px,calc(100%-2rem))] rounded-md bg-background/90 backdrop-blur border shadow p-3 flex items-center justify-between gap-2">
      <span className="text-sm">{text}</span>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onYes}>
          Yes
        </Button>
      </div>
    </div>
  );
}

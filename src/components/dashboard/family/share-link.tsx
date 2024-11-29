"use client"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function ShareLink({slug, baseUrl}:{slug: string, baseUrl: string}) {


    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: string) => {
      window.navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    };
    const url = `${baseUrl}/family/${slug}/join`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Share Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join the family.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={url}
              readOnly
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={() => {
            copyToClipboard(url);
          }}>
            <span className="sr-only">Copy</span>
            {copied ? <Check /> :<Copy size={16} />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

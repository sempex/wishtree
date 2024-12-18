"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addMember } from "./actions";
import { useState } from "react";

export default function AddMember({ slug }: { slug: string }) {
  const [mem, addMem] = useState<string>("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new member to the family</DialogTitle>
          <DialogDescription>
            You can add a new member to the family, they can register with their
            own WishTree account or join the family anonymously.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input id="familyName" placeholder="Tim" onChange={(e) => addMem(e.target.value)} />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={() => addMember(slug, mem)}>Add member</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

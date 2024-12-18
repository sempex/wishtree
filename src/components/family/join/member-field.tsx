"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { User } from "@/utils/schema";
import Link from "next/link";

export default function MemberField({ members, familyId }: { members: User[], familyId: string }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col gap-2">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            {user
              ? members.find((member) => member.username === user)?.username
              : "Select member..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <Link href={`/wishlist/member/${userId}/${familyId}/add`}>
          <Button className="w-[300px]">Continue</Button>
        </Link>
      </div>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search members..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {members.map((member) => (
                <CommandItem
                  key={member.id}
                  value={member.username}
                  onSelect={(currentValue) => {
                    setUser(currentValue === user ? "" : currentValue);
                    setUserId(member.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      user === member.username ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {member.username}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

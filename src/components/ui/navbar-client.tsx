"use client";

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import Avatar from "boring-avatars";
import { User } from "@supabase/supabase-js";
import { signOut } from "@/utils/supabase/actions";
import Link from "next/link";

export default function NavbarClient({ user }: { user: User | null }) {
  const router = useRouter();

  return (
    <>
      {!user ? (
        <NavigationMenuItem className="flex gap-3">
          <Button onClick={() => router.push("/login")}>Log In</Button>
          <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        </NavigationMenuItem>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar name={user.id} width={40} height={40} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard" passHref>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
      }
    </>
  )
}

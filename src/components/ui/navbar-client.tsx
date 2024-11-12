"use client";

import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function NavbarClient() {
  const router = useRouter();
  
  return (
    <NavigationMenuItem className="flex gap-3">
      <Button onClick={() => router.push("/login")}>Log In</Button>
      <Button onClick={() => router.push("/signup")}>Sign Up</Button>
    </NavigationMenuItem>
  );
}

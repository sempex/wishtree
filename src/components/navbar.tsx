import * as React from "react";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import Avatar from "boring-avatars";
import { redirect } from "next/navigation";
export async function Navbar() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  return (
    <NavigationMenu className="m-4">
      <NavigationMenuList>
        <NavigationMenuItem className="flex gap-2 items-center">
          <Image
            src="/logo.webp"
            alt="shadcn/ui"
            width={50}
            height={50}
            className="rounded-full"
          />
          <a className="font-bold">WishTree</a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        {!user.data.user ? (
          <NavigationMenuItem className="flex gap-3">
            <Button onClick={() => redirect("/login")}>Log In</Button>
            <Button onClick={() => redirect("/signup")}>Sign Up</Button>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem className="flex items-center">
            <NavigationMenuTrigger className="">
              <Avatar name={user.data.user.email} width={40} height={40} />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <Button>Sign Out</Button>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

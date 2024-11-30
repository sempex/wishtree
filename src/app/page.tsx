"use client";

import ChristmasCountdown from "@/components/christmas-countdown";
import DocsCard from "@/components/docs/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Docs() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-16 space-y-6">
      <div className="flex flex-col items-center">
        <Image
          src="/logo.webp"
          alt="WishTree Logo"
          width={150}
          height={150}
          className="rounded-full shadow-lg mb-4"
        />
      </div>

      <div className="text-center max-w-md">
        <ChristmasCountdown />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DocsCard
          title="How does it work?"
          description="Quick instruction on how to use the tool!"
          content={
            <div>
              <Button onClick={() => router.push("/docs/getstarted")}>
                Go
              </Button>
            </div>
          }
        />
        <DocsCard
          title="Which Techstack is used?"
          description="Documentation of the detailled projects techstack"
          content={
            <div>
              <Button onClick={() => router.push("/docs/techstack")}>Go</Button>
            </div>
          }
        />
      </div>
    </div>
  );
}

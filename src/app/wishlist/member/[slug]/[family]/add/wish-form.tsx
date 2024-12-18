"use client";

import * as React from "react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusIcon } from "lucide-react";
import { addWishes } from "./actions";

export default function WishForm({
  memberId,
  familyId,
  userMail,
  submited,
  revalidateString,
}: {
  memberId: string;
  familyId: string;
  userMail?: string;
  submited: boolean;
  revalidateString: string
}) {
  const [wishes, setWishes] = useState<string[]>([""]);
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const addWish = () => {
    setWishes([...wishes, ""]);
  };

  const updateWish = (index: number, value: string) => {
    const updatedWishes = [...wishes];
    updatedWishes[index] = value;
    setWishes(updatedWishes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await addWishes(memberId, wishes, familyId, email, revalidateString);
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add your wishes!</CardTitle>
        <CardDescription>
          Add what you&apos;d like to get for Christmas!
        </CardDescription>
      </CardHeader>
      {
        submited ? (
          <CardContent>
            <p className="text-center">
              Your wishes have already been submitted! Thank you!
            </p>
          </CardContent>
        ) :
        <>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <Label className="font-semibold">
                  Email address where you will receive your draw.
                </Label>
                <Input
                  placeholder="john.doe@shiper.app"
                  type="email"
                  value={userMail ? userMail : email}
                  readOnly={!!userMail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {wishes.map((wish, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <Label className="font-semibold">Wish {index + 1}</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={wish}
                        onChange={(e) => updateWish(index, e.target.value)}
                        placeholder="Your wish"
                        required
                      />
                      {index === wishes.length - 1 && (
                        <Button
                          type="button"
                          onClick={addWish}
                          className="shrink-0"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <CardFooter className="px-0 pt-6">
                <Button className="w-28" type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <a>Submit</a>
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </>
      }
    </Card>
  );
}

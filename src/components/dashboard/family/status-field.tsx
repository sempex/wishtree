"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/utils/schema";

export default function StatusField({ members }: { members: User[] }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Page</CardTitle>
        <CardDescription>
          Check whether everyone has submitted their wishes!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {members.map((member) => {
            return (
              <div key={member.id} className="flex justify-between px-4 my-1">
                <a>{member.username}</a>
                <a className={member.hasSubmitted ? `w-24 text-center border rounded-full px-3 py-0.5 font-bold text-sm text-green-600 border-green-600 bg-green-200` : `w-24 text-center border rounded-full px-3 py-0.5 font-bold text-sm text-red-600 border-red-600 bg-red-200`}>{member.hasSubmitted ? "submitted" : "pending"}</a>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

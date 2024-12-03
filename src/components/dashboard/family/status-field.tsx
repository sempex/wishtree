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
                <a className="border rounded-full px-3 py-0.5 border-green-600 bg-green-200 font-bold text-sm text-green-600">pending</a>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

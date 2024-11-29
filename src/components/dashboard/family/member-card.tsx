"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Avatar from "boring-avatars";

type User = {
  id: string;
  email?: string;
  username: string;
  userId?: string
}

export default function MemberCard({ members, memberCount }: { members: User[], memberCount: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>See who joined the family already</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4">
          {members.map((member) => {
            return (
              <div key={member.username} className="flex flex-col items-center">
                <Avatar
                  name={member.userId ? member.userId : member.id}
                  height={40}
                  width={40}
                />
                <p className="text-muted-foreground">{member.username}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <p className="font-bold">{memberCount} total members</p>
      </CardFooter>
    </Card>
  );
}

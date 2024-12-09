"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DatePicker from "./datepicker";
import { User } from "@/utils/schema";
import { draw } from "./actions";


export default function ControlCenter({familyId, dueDate, members}: {familyId: string, dueDate?: Date, members: User[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Control center</CardTitle>
        <CardDescription>Manage your secret Santa family here!</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">Wish submission ending:</p>
          <DatePicker familyId={familyId} dueDate={dueDate} />
          <p className="font-semibold">Trigger the draw now!</p>
          <Button className="w-[280px]" onClick={() => draw(members)}>Draw now!</Button>
        </div>
      </CardContent>
    </Card>
  );
}

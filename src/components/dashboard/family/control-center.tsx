"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ControlCenter() {
  return (
    <Card className="flex justify-center items-center">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Control center</CardTitle>
            <CardDescription>
              Manage your secret Santa family here!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Draw now!</Button>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Status Page</CardTitle>
            <CardDescription>
              Check whether everyone has submitted their wishes!
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </Card>
  );
}

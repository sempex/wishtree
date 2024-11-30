import { getFamily } from "@/components/dashboard/family/actions";
import Member from "@/components/family/join/member";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = await getFamily(slug);

  console.log(family);

  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Select your Member</CardTitle>
          <CardDescription>
            Select which of the following persons you are!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            {family?.members.map((member) => {
              return <Member key={member.id} name={member.name} id={member.id} />;
            })}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

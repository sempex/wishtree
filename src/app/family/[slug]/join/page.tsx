import { getFamily } from "@/components/dashboard/family/actions";
import MemberField from "@/components/family/join/member-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <CardTitle>Who are you?</CardTitle>
          <CardDescription>
            Select which of the following persons you are!
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          {/* {family?.members.map((member) => {
            return <Member key={member.id} name={member.name} id={member.id} />;
          })} */}
          
          <MemberField
            members={
              family?.members?.map((member) => {
                return {
                  id: member.id,
                  username: member.name,
                  email: member.user?.email,
                  userId: member.user?.id,
                  hasSubmitted: member.hasSubmitted,
                };
              }) || []
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}

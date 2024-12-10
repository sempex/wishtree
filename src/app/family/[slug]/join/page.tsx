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

  return (
    <div className="flex justify-center items-center m-4">
      <Card>
        <CardHeader>
          <CardTitle>Who are you?</CardTitle>
          <CardDescription className="">
            Select which of the following persons you are! <br />
            {family?.dueDate ? (
              <a>
                You have time until{" "}
                <span className="font-bold">
                  {" "}
                  {family?.dueDate?.toDateString()}{" "}
                </span>
                to submit your wishes!
              </a>
            ) : (
              <a>
                The family administrator did not set a due date to submit your
                wishes!
              </a>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          {/* {family?.members.map((member) => {
            return <Member key={member.id} name={member.name} id={member.id} />;
          })} */}

          <MemberField
            members={
              family?.FamilyMember?.map((family) => {
                return {
                  id: family.member.id,
                  username: family.member.name,
                  email: family.user?.email,
                  userId: family.user?.id,
                  hasSubmitted: family.hasSubmitted,
                };
              }) || []
            }
            familyId={slug}
          />
        </CardContent>
      </Card>
    </div>
  );
}

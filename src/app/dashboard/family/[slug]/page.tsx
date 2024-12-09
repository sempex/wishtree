import { getFamily } from "@/components/dashboard/family/actions";
import AddMember from "@/components/dashboard/family/add-member";
import ControlCenter from "@/components/dashboard/family/control-center";
import MemberCard from "@/components/dashboard/family/member-card";
import { ShareLink } from "@/components/dashboard/family/share-link";
import StatusField from "@/components/dashboard/family/status-field";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = await getFamily(slug);

  const members =
    family?.members?.map((member) => {
      return {
        id: member.id,
        username: member.name,
        email: member.user?.email,
        userId: member.user?.id,
        hasSubmitted: member.hasSubmitted,
      };
    }) || [];

  return (
    <div className="mx-4">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">{family?.name.toLocaleUpperCase()}</p>
        <div className="flex gap-2">
          <AddMember slug={slug} />
          <ShareLink
            baseUrl={process.env.APP_URL ?? "example.com"}
            slug={slug}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-2">
          <ControlCenter familyId={slug} />
        </div>
        <StatusField members={members} />
        <MemberCard
          members={members}
          memberCount={family?.members?.length || 0}
        />
      </div>
    </div>
  );
}

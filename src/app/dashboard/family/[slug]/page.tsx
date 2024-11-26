import { getFamily } from "@/components/dashboard/family/actions";
import MemberCard from "@/components/dashboard/family/member-card";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const family = await getFamily(slug);
  return (
    <div className="px-4">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{family?.name.toLocaleUpperCase()}</p>
        <div className="flex gap-2">
          <Button>Add Member</Button>
          <Button>Share Link</Button>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <MemberCard
          members={family?.members?.map((member) => member.user) || []}
          memberCount={family?.members?.length || 0}
        />
      </div>
    </div>
  );
}

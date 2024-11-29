import { getFamily } from "@/components/dashboard/family/actions";
import AddMember from "@/components/dashboard/family/add-member";
import MemberCard from "@/components/dashboard/family/member-card";
import { ShareLink } from "@/components/dashboard/family/share-link";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const family = await getFamily(slug);
  
  return (
    <div className="px-4">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">{family?.name.toLocaleUpperCase()}</p>
        <div className="flex gap-2">
          <AddMember slug={slug}/>
          <ShareLink baseUrl={process.env.APP_URL ?? "example.com"} slug={slug} />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <MemberCard
          members={(family?.members?.map((member) => {
            return {
              id: member.id,
              username: member.name,
              email: member.user?.email,
              userId: member.user?.id
            }
          })) || []}
          memberCount={family?.members?.length || 0}
        />
      </div>
    </div>
  );
}

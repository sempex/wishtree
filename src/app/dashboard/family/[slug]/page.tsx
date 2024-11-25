import { getFamily } from "@/components/dashboard/family/actions";
import { Button } from "@/components/ui/button";
import Avatar from "boring-avatars";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const family = await getFamily(slug);
  return (
    <div className="px-4">
      <div className="flex justify-between">
        <p className="font-bold text-xl">{family?.name.toLocaleUpperCase()}</p>
        <p>Members: {family?.members.length}</p>
        <div>
          {family?.members.map((member) => (
            <Avatar name={member.userId} key={member.user.email} width={40} height={40} />
          ))}
        </div>
        <div className="flex gap-2">
          <Button>Add Member</Button>
          <Button>Share Link</Button>
        </div>
      </div>
    </div>
  );
}

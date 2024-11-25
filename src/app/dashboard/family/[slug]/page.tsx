import { getFamily } from "@/components/dashboard/family/actions";
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
    </div>
  );
}

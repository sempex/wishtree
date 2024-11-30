import Avatar from "boring-avatars";
import Link from "next/link";

export default function Member({ id, name }: { id?: string; name: string }) {
  return (
    <Link href={`/wishlist/member/${id}/add`}>
      <div className="flex gap-4 items-center mt-2">
        <Avatar name={id ? id : name} size="40" />
        <p>{name}</p>
      </div>
    </Link>
  );
}

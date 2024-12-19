import * as React from "react";
import WishForm from "./wish-form";
import { meSubmitted } from "@/components/dashboard/family/actions";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; family: string }>;
}) {
  const { slug, family } = await params;
  const submitted = await meSubmitted(slug, family);
  return (
    <div className="flex justify-center items-center p-4">
      <WishForm
        memberId={slug}
        familyId={family}
        submited={submitted || false}
        revalidateString="/wishlist/member/[slug]/[family]/add"
      />
    </div>
  );
}

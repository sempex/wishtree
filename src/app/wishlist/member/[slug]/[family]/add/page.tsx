import * as React from "react";
import WishForm from "./wish-form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string, family: string }>;
}) {
  const { slug, family } = await params;
  console.log(slug, family);
  return <WishForm memberId={slug} familyId={family} />;
}

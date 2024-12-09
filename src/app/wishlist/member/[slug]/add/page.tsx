import * as React from "react";
import WishForm from "./wish-form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <WishForm memberId={slug} />;
}

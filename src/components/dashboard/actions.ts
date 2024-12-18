"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

async function addFamily(familyName: string) {
  "use server";
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user?.id) throw new Error("User not found");

  try {
    await prisma.$transaction(async (prisma) => {
      const username = await prisma.user.findUnique({
        where: { id: user.data.user?.id },
        select: { username: true },
      });
      let member = await prisma.member.findUnique({
        where: {
          userId: user.data.user?.id,
          name: username?.username ?? "Unknown",
        },
      });
      if (!member) {
        member = await prisma.member.create({
          data: {
            name: username?.username ?? "Unknown",
            userId: user.data.user?.id,
          },
        });
      }
      await prisma.family.create({
        data: {
          name: familyName,
          FamilyMember: {
            create: {
              memberId: member.id,
              userId: user.data.user?.id,
            },
          },
        },
      });
    });
  } catch (error) {
    console.error("Error adding family:", error);
  }
  revalidatePath("/dashboard");
}

async function getFamilys() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const familys = await prisma.familyMember.findMany({
    where: { userId: user.data.user?.id },
    include: { family: true },
  });

  return familys;
}

export { addFamily, getFamilys };

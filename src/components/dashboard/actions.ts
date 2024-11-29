"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

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

      await prisma.family.create({
        data: {
          name: familyName,
          members: {
            create: {
              userId: user.data.user?.id,
              name: username?.username ?? "Unknown",
            },
          },
        },
      });
    });
  } catch (error) {
    console.error("Error adding family:", error);
    toast("Could not add family. Please try again.");
  }
}

async function getFamilys() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const familys = await prisma.member.findMany({
    where: { userId: user.data.user?.id },
    include: { family: true },
  });

  return familys;
}

export { addFamily, getFamilys };

"use server"

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
        const family = await prisma.family.create({
          data: { name: familyName },
        });

        await prisma.userFamily.create({
          data: {
            familyId: family.id,
            userId: user.data.user?.id || "",
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

    const familys = await prisma.userFamily.findMany({
        where: { userId: user.data.user?.id },
        include: { family: true },
    })

    return familys
}

  export { addFamily, getFamilys };
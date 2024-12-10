"use server";

import prisma from "@/lib/prisma";
import { toast } from "sonner";

async function addWishes(memberId: string, wishes: string[]) {
  try {
    await prisma.$transaction(async (prisma) => {
      const family = await prisma.familyMember.findFirst({
        where: {
          memberId: memberId,
        },
        select: {
          familyId: true,
        },
      });
      await prisma.wishList.create({
        data: {
          familyId: family?.familyId || "",
          memberId: memberId,
          wishes: wishes,
        },
      });
      await prisma.familyMember.update({
        where: {
          memberId_familyId: {
            familyId: family?.familyId || "",
            memberId: memberId,
          },
        },
        data: {
          hasSubmitted: true,
        },
      });
    });
  } catch (error) {
    console.error("Error adding wishlist:", error);
    toast("Could not add wishlist. Please try again.");
  }
}

export { addWishes };

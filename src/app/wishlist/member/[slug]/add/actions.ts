"use server";

import prisma from "@/lib/prisma";
import { toast } from "sonner";

async function addWishes(memberId: string, wishes: string[]) {
  try {
    await prisma.$transaction(async (prisma) => {
      const family = await prisma.family.findFirst({
        where: {
          members: {
            some: {
              id: memberId,
            },
          },
        },
        select: {
          id: true,
        },
      });
      await prisma.wishList.create({
        data: {
          familyId: family?.id || "",
          memberId: memberId,
          wishes: wishes,
        },
      });
    });
  } catch (error) {
    console.error("Error adding wishlist:", error);
    toast("Could not add wishlist. Please try again.");
  }
}

export { addWishes };

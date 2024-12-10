"use server";

import prisma from "@/lib/prisma";

async function addWishes(memberId: string, wishes: string[], familyId: string) {
  console.log(memberId);
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.wishList.create({
        data: {
          familyId: familyId || "",
          memberId: memberId,
          wishes: wishes,
        },
      });
      await prisma.familyMember.update({
        where: {
          memberId_familyId: {
            familyId: familyId || "",
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
  }
}

export { addWishes };

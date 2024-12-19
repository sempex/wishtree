"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function addWishes(
  memberId: string,
  wishes: string[],
  familyId: string,
  email: string,
  revalidateString: string
) {
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
    await prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        email: email,
      },
    });
    revalidatePath(revalidateString);
  } catch (error) {
    console.error("Error adding wishlist:", error);
  }
}

export { addWishes };

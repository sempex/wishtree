"use server";
import prisma from "@/lib/prisma";

async function getFamily(familyID: string) {
  const family = await prisma.family.findUnique({
    where: { id: familyID },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
  return family;
}

async function addMember(familyID: string, username: string, userId?: string) {
  await prisma.member.create({
    data: {
      familyId: familyID,
      name: username,
      userId: userId,
    },
  });
}

async function memberStatus(memberId: string, familyId: string) {
  const wishlist = await prisma.wishList.findUnique({
    where: {
      memberId_familyId: {
        familyId,
        memberId,
      },
    },
  });
  return wishlist;
}

async function setDueDate(familyId: string, Date?: Date) {
  await prisma.family.update({
    where: { id: familyId },
    data: {
      dueDate: Date
    }
  })
}

export { getFamily, addMember, memberStatus, setDueDate };

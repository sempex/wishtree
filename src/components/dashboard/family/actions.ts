"use server";
import prisma from "@/lib/prisma";
import { Assignment, User } from "@/utils/schema";

async function getFamily(familyID: string) {
  const family = await prisma.family.findUnique({
    where: { id: familyID },
    include: {
      FamilyMember: {
        include: {
          member: true,
          user: true,
        },
      },
    },
  });
  return family;
}

async function addMember(familyID: string, username: string, userId?: string) {
  await prisma.$transaction(async (prisma) => {
    const member = await prisma.member.create({
      data: {
        name: username,
        userId: userId,
      },
    });
    await prisma.familyMember.create({
      data: {
        memberId: member.id,
        familyId: familyID,
      },
    });
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
      dueDate: Date,
    },
  });
}

function shuffle(array: User[]): User[] {
  const shuffled = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function draw(members: User[], familyId: string) {
  let assignments: Assignment[] = [];
  let isValid = false;

  while (!isValid) {
    const shuffledMembers = shuffle([...members]);
    isValid = members.every(
      (member, index) => member.id !== shuffledMembers[index].id
    );
    if (isValid) {
      assignments = members.map((member, index) => ({
        giver: member.id,
        receiver: shuffledMembers[index].id,
      }));
    }
  }
  for (const assignment of assignments) {
    try {
      await prisma.familyMember.update({
        where: {
          memberId_familyId: {
            familyId: familyId,
            memberId: assignment.receiver,
          },
        },
        data: {
          giver: {
            connect: {
              id: assignment.giver,
            },
          },
        },
      });
    } catch (error) {
      console.error("Failed to draw secret Santa assignments", error);
    }
  }
}
export { getFamily, addMember, memberStatus, setDueDate, draw };

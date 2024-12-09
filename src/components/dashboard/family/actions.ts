"use server";
import prisma from "@/lib/prisma";
import { Assignment, User } from "@/utils/schema";

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

async function draw(members: User[]) {
  let assignments: Assignment[] = [];
  let isValid = false;

  while (!isValid) {
    console.log("try");
    const shuffledMembers = shuffle(members);
    isValid = members.every(
      (member, index) => member.username !== shuffledMembers[index].username
    );
    if (isValid) {
      assignments = members.map((member, index) => ({
        giver: member.username,
        receiver: shuffledMembers[index].username,
      }));
    }
  }
  console.log(assignments);
}
export { getFamily, addMember, memberStatus, setDueDate, draw };

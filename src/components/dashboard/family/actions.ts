"use server";
import DrawEmail from "@/components/emails/draw";
import prisma from "@/lib/prisma";
import { Assignment, DrawEmailProps, User } from "@/utils/schema";
import { Resend } from "resend";
import { z } from "zod";

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

async function getMember(userId: string) {
  const member = await prisma.member.findUnique({
    where: {
      userId: userId,
    },
  });
  return member;
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
      const familyMember = await prisma.familyMember.update({
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
        include: {
          member: true,
          giver: true,
          user: true,
        },
      });

      const wishes = await prisma.wishList.findUnique({
        where: {
          memberId_familyId: {
            familyId: familyId,
            memberId: assignment.giver,
          },
        },
      });

      const mailInfo: DrawEmailProps = {
        giver: familyMember.giver?.name || "unknown",
        username: familyMember.member.name,
        wishes: wishes?.wishes || [],
        mail:
          (familyMember.member.email
            ? familyMember.member.email
            : familyMember.user?.email) || "unknown",
      };
      sendMail(mailInfo);
    } catch (error) {
      console.error("Failed to draw secret Santa assignments", error);
    }
  }
}

async function sendMail({ giver, username, wishes, mail }: DrawEmailProps) {
  const emailSchema = z.string().email();
  try {
    emailSchema.parse(mail);
  } catch (e) {
    console.error("Invalid email address", e);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_EMAIL || "team@timreber.me",
    to: [mail],
    subject: "Your Secret Santa assignment",
    react: DrawEmail({ giver, username, wishes, mail }),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
  await new Promise((r) => setTimeout(r, 500));
}
export {
  getFamily,
  addMember,
  memberStatus,
  setDueDate,
  draw,
  sendMail,
  getMember,
};

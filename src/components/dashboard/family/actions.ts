"use server";
import prisma from "@/lib/prisma";

async function getFamily(familyID: string) {
    const family = await prisma.family.findUnique({
        where: { id: familyID },
        include: {
            members: {
                include: {
                    user: true
                }
            }
        }
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
    })
}

export { getFamily, addMember };
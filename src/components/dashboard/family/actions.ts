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

export { getFamily };
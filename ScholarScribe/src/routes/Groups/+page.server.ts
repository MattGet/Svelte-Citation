import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function _getGroups() {
    try {
        const groups = await prisma.group.findMany();
        return groups;
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
}
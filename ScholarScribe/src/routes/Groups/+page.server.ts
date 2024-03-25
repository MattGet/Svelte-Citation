// +page.server.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function _post(request: any) {
    const { title, userid, genDel, isPublic } = request.body;

    try {
        const newGroup = await prisma.group.create({
            data: {
                title,
                userid,
                genDel,
                isPublic
            }
        });

        return {
            status: 201,
            body: newGroup
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Error creating group' }
        };
    }
}
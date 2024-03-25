import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function post(req: any) {
  try {
    const { title, userid, genDel, genre, tags, isPublic } = req.body;

    // Basic validation
    if (!title || !userid) {
      return {
        status: 400,
        body: { error: 'Title and User ID are required fields.' },
      };
    }

    const newGroup = await prisma.group.create({
      data: {
        title,
        userid,
        genDel,
        genre,
        tags,
        isPublic,
      },
    });

    return {
      status: 201,
      body: newGroup,
    };
  } catch (error) {
    console.error('Error creating group:', error);
    return {
      status: 500,
      body: { error: 'Error creating group' },
    };
  }
}

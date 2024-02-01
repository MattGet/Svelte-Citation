import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

declare global {
    // eslint-disable-next-line no-var
    var __prisma: import('@prisma/client').PrismaClient;
}

const prisma = global.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
    global.__prisma = prisma;
}

export { prisma };
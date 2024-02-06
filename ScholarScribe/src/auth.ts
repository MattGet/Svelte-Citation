
import { SvelteKitAuth } from "@auth/sveltekit"
import GoogleProvider from '@auth/core/providers/google';
import { prisma } from "$lib/server/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NODE_ENV,
} from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
    adapter: PrismaAdapter(prisma),
})
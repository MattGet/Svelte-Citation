import { CLERK_SECRET_KEY } from '$env/static/private';
import { Clerk } from '@clerk/backend';
import type { PageServerLoad } from "./$types"

const clerk = Clerk({ secretKey: CLERK_SECRET_KEY });

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    let Users = await clerk.users.getUserList();

    return {
        users: serializeNonPOJOs(Users)
    }
}

const serializeNonPOJOs = (value: object | null) => {
    return structuredClone(value)
};
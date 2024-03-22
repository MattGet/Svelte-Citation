import { CLERK_SECRET_KEY } from '$env/static/private';
import { Clerk } from '@clerk/backend';
import type { PageServerLoad } from "./$types"
import { redirect } from '@sveltejs/kit';

const clerk = Clerk({ secretKey: CLERK_SECRET_KEY });

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    let Users = await clerk.users.getUserList();

    return {
        users: serializeNonPOJOs(Users)
        //users: Users
    }
}

// Returns value as a plain old javascript object
const serializeNonPOJOs = (value: object | null) => {
    return structuredClone(value)
};

export const actions: Actions = {
    updateRole: async ({ url, request }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, { message: "Invalid request" })
        }

        const formData = await request.formData();
        const { role } = Object.fromEntries(formData) as {
            role: string
        }

        try {
            clerk.users.updateUserMetadata(id, {
                publicMetadata: {
                    "role": role
                }
            });
        } catch (err) {
            console.error(err)
            return fail(500, {
                message: "Something went wrong when updating the role",
            })
        }

        redirect(303, "/adminRedirect")
    },
}
// @ts-ignore
import { CLERK_SECRET_KEY } from '$env/static/private';
import { Clerk } from '@clerk/backend';
import type { Actions, PageServerLoad } from "./$types"
import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync } from 'fs';
import { getTemplates, registerStyle, removeStyle } from '$lib/client/export.funcs';

const clerk = Clerk({ secretKey: CLERK_SECRET_KEY });

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    let Users = await clerk.users.getUserList();
    let templateList = getTemplates();
    return {
        users: serializeNonPOJOs(Users),
        templates: serializeNonPOJOs(templateList),
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
    addCiteStyle: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        if (
            !(formData.fileToUpload as File).name ||
            (formData.fileToUpload as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }

        const { fileToUpload } = formData as { fileToUpload: File };

        let templateName = fileToUpload.name.substring(0, fileToUpload.name.length - 4);
        let template = fileToUpload.text(); // The actual XML file

        await registerStyle(templateName, await template);

        return {
            success: true
        };
    },
    removeCiteStyle: async ({ url }) => {
        const name = url.searchParams.get("name")
        if (!name) {
            return fail(400, { message: "Invalid request" })
        }

        removeStyle(name);

        return {
            success: true
        };
    },
}
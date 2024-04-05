import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    creategroup: async ({ request }) => {
        try {
            const formData = await request.formData();
            const title = formData.get('title') as string;
            const userid = formData.get('userid') as string;
            const genDel = formData.get('genDel') as string;
            const genre = formData.getAll('genre') as string[];
            const tags = formData.getAll('tags') as string[];
            const isPublicValue = formData.get('isPublic') as string;
            const isPublic = isPublicValue === 'true';

            // Assuming Prisma model and fields are correctly defined
            const group = await prisma.group.create({
                data: {
                    title,
                    userid,
                    genDel,
                    genre,
                    tags,
                    isPublic,
                },
            });

            // Redirect to the groups page after successful creation
            return redirect(303, "/Groups");
        } catch (err) {
            console.error(err);
            // Return a failure response to the client
            return fail(500, { message: "Could not create the group." });
        }
    },
};

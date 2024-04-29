// Import necessary modules and functions
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types"
import type { PageData } from "../$types";

export const load = async (page: PageData) => {
    const sources = await prisma.source.findMany();
    return { sources };
};

export const actions: Actions = {
    creategroup: async ({ request }) => {
        try {
            const formData = await request.formData();
            const { title, userid, genDel } = Object.fromEntries(formData) as {
                title: string;
                userid: string;
                genDel: string;
            };

            const user = formData.get("user")?.toString() || "default_user";
            const isPublicString = formData.get("isPublic");
            const isPublic = isPublicString ? Boolean(isPublicString) : false;
            const genre = formData.get("genre")?.toString().split(",") || [];
            const selectedSources = formData.getAll("selectedSources") || [];

            // Create the group with the provided data
            const group = await prisma.group.create({
                data: {
                    title,
                    userid,
                    user,
                    genDel,
                    genre,
                    isPublic,
                    sources: {
                        connect: selectedSources.map((sourceId) => ({ id: sourceId })),
                    } as any,
                },
            });

            // Redirect to the groups page after successful creation
            redirect(303, "/Groups");
        } catch (err) {
            console.error(err);
            // Return a failure response to the client
            return fail(500, { message: "Could not create the group." });
        }
    }
}
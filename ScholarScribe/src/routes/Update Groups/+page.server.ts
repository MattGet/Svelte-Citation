import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    return {
        group: await prisma.group.findUnique({
            where: {
                id: params.groupid,
            },
        }
        )
    }
}
export const actions: Actions = {
    updategroup: async ({ request}) => {
    try {
        const formData = await request.formData();
        const { title, userid, genDel } = Object.fromEntries(formData) as {
            title: string;
            userid: string;
            genDel: string;
        };
        
        const user = formData.get("user") || "default_user";
        const isPublicString = formData.get("isPublic");
        const isPublic = isPublicString ? Boolean(isPublicString) : false;  
        const genre = formData.get("genre")?.toString().split(",") || [];
        const sources = formData.get("selectedSources")?.toString().split(",") ||[];
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
                    connect: sources.map((sourceId) => ({ id: sourceId })),
                } 
            } as any,
        });

        // Redirect to the groups page after successful creation
        return redirect(303, "/Groups");
    } catch (err) {
        console.error(err);
        // Return a failure response to the client
        return fail(500, { message: "Could not create the group." });
    }
}}
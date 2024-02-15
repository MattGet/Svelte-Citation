import type { PageServerLoad, Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    return {
        source: await prisma.source.findUnique({
            where: {
                id: params.sourceid,
            },
        })
    }
}


export const actions: Actions = {
    deleteSource: async ({ url }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, { message: "Invalid request" })
        }

        try {
            await prisma.source.delete({
                where: {
                    id: id,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, {
                message: "Something went wrong deleting your article",
            })
        }

        redirect(303, "/Sources")
    },
}
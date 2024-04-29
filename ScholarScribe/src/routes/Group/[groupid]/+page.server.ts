import type { PageServerLoad, Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    const group = await prisma.group.findUnique({
        where: {
            id: params.groupid,
        },
    })
    const groupSources = await prisma.source.findMany({
        where: {
            id: { in: group?.sourceids }
        }
    })
    return {
        group: group,
        sources: groupSources
    }
}


export const actions: Actions = {
    deleteGroup: async ({ url }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, { message: "Invalid request" })
        }

        try {
            await prisma.group.delete({
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

        redirect(303, "/Groups")
    },
}
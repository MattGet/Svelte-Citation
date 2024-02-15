import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"

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
    updateSource: async ({ request }) => {
        const { title, URL, userid, authorFirstName, authorLastName, year, publisher, type, id } = Object.fromEntries(await request.formData()) as {
            title: string
            URL: string
            userid: string
            authorFirstName: string
            authorLastName: string
            year: string
            publisher: string //kill
            type: string
            id: string
        }

        try {
            await prisma.source.update({
                where: {
                    id: id
                },
                data: {
                    title,
                    URL,
                    userid,
                    authorFirstName,
                    authorLastName,
                    year,
                    publisher,
                    type,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not update the source!" })
        }

        redirect(303, "/Sources")
    },
}
import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"

export const actions: Actions = {
    createSource: async ({ request }) => {
        const { title, URL, userid, authorFirstName, authorLastName, year, publisher, type } = Object.fromEntries(await request.formData()) as {
            title: string
            URL: string
            userid: string
            authorFirstName: string
            authorLastName: string
            year: string
            publisher: string //kill
            type: string
        }

        try {
            await prisma.source.create({
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
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources")
    },
}
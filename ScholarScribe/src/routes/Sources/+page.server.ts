import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"

export const load: PageServerLoad = async () => {
    return {
        sources: await prisma.source.findMany(),
    }
}

export const actions: Actions = {
    createSource: async ({ request }) => {
        const { title, content, userid, authorFirstName, authorLastName, year, publisher } = Object.fromEntries(await request.formData()) as {
            title: string
            content: string
            userid: string
            authorFirstName: string
            authorLastName: string
            year: string
            publisher: string
        }

        try {
            await prisma.source.create({
                data: {
                    title,
                    content,
                    userid,
                    authorFirstName,
                    authorLastName,
                    year,
                    publisher,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        return {
            status: 201,
        }
    },
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

        return {
            status: 200,
        }
    },
}
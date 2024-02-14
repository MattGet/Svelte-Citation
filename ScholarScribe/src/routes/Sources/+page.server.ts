import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"
import FileSaver from 'file-saver';

const { saveAs } = FileSaver;

export const load: PageServerLoad = async () => {
    return {
        sources: await prisma.source.findMany(),
    }
}

export const actions: Actions = {
    createSource: async ({ request }) => {
        const { title, URL, userid, authorFirstName, authorLastName, year, publisher, type } = Object.fromEntries(await request.formData()) as {
            title: string
            URL: string
            userid: string
            authorFirstName: string
            authorLastName: string
            year: string
            publisher: string
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
    moreInfo: async ({ url }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, { message: "Invalid request" })
        }

        try {
            await prisma.source.findUnique({
                where: {
                    id: id,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, {
                message: "Something went wrong fetching your citation",
            })
        }

        return {
            status: 200,
        }
    },
}
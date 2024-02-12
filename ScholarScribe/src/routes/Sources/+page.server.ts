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
        const { title, content, userid } = Object.fromEntries(await request.formData()) as {
            title: string
            content: string
            userid: string
        }

        try {
            await prisma.source.create({
                data: {
                    title,
                    content,
                    userid,
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
    exportJSON: async ({ url }) => {
        const id = url.searchParams.get("id")
        if (!id) {
            return fail(400, { message: "Invalid request" })
        }

        try {
            const data = await prisma.source.findUniqueOrThrow({
                where: {
                    id: id,
                },
            })


            var blob = new Blob([JSON.stringify(data)], { type: "application/json;charset=utf-8" });

            var a = document.createElement('a');

            document.body.append(a);

            a.download = data.title;

            a.href = URL.createObjectURL(blob);

            a.click();

            a.remove();
        } catch (err) {
            console.error(err)
            return fail(500, {
                message: "Something went wrong exporting your article to JSON",
            })
        }

        return {
            status: 200,
        }
    },
}
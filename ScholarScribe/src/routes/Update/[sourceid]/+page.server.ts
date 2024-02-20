import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author } from "@prisma/client"

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
        const formData = await request.formData();
        const { title, URL, userid, year, publisher, type, id } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            year: string
            publisher: string
            type: string
            id: string
        }

        // Extracting numbAuthor as a number, assuming it's part of the form data
        const NUMB = Number(formData.get("numAuthors"));
        if (isNaN(NUMB)) {
            throw new Error("Invalid numbAuthor value");
        }
        if (NUMB < 1) {
            throw new Error("Invalid numbAuthor, must be at least 1");
        }

        let authors = []

        for (let i = 0; i < NUMB; i++) {
            const first = formData.get(`first[${i}]`) as string;
            const last = formData.get(`last[${i}]`) as string;
            const von = formData.get(`von[${i}]`) as string;
            const jr = formData.get(`jr[${i}]`) as string;

            let author = { first: first, last: last, von: von, jr: jr } as Author;
            authors[i] = author;
        }

        try {
            const source = await prisma.source.update({
                where: {
                    id: id
                },
                data: {
                    title,
                    URL,
                    userid,
                    year,
                    publisher,
                    type,
                    authors,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources")
    },
}
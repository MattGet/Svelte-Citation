import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author, Month, Type } from "@prisma/client"

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
        const { title, URL, userid, day, month, year, publisher, type, id } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            day: string
            month: Month
            year: string
            publisher: string
            type: Type
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

        let author = []

        for (let i = 0; i < NUMB; i++) {
            const given = formData.get(`given[${i}]`) as string;
            const family = formData.get(`family[${i}]`) as string;
            const suffix = formData.get(`suffix[${i}]`) as string;

            let authors = { given: given, family: family, suffix: suffix } as Author;
            author[i] = authors;
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
                    date: {
                        year,
                        month,
                        day,
                    },
                    publisher,
                    type,
                    author,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources")
    },
}
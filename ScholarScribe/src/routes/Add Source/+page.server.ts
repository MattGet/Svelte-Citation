import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author } from "@prisma/client"
import type { Month } from "@prisma/client"


export const actions: Actions = {
    createSource: async ({ request }) => {
        const formData = await request.formData();
        const { title, URL, userid, day, month, year, publisher, type } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            day: string
            month: Month
            year: string
            publisher: string
            type: string
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
            const source = await prisma.source.create({
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

            /*
            for (let i = 0; i < NUMB; i++) {
                const first = formData.get(`first[${i}]`) as string;
                const last = formData.get(`last[${i}]`) as string;
                const von = formData.get(`von[${i}]`) as string;
                const jr = formData.get(`jr[${i}]`) as string;

                const author = await prisma.author.create({
                    data: {
                        first: first,
                        last: last,
                        von: von,
                        jr: jr,
                        source: {
                            connect: { id: source.id },
                        },
                    },
                });
            }
            */
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources")
    },
}
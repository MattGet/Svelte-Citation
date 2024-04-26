import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author } from "@prisma/client"

//@ts-ignore
export const load: PageServerLoad = async ({ params }) => {
    const sources = await prisma.source.findMany();

    // Initialize an empty array to store all tags
    let allTags: string[] = [];

    // Loop through each source object
    sources.forEach(source => {
        //console.log(source.tags)
        if (source.tags != undefined && source.tags != undefined) {
            // Split the tags string into an array of individual tags
            var tagsArray = source.tags.split(',');

            // Concatenate the tagsArray with allTags array
            allTags = allTags.concat(tagsArray);
        }
    });
    // Create a Set to store unique tags
    var uniqueTagsSet = new Set(allTags);

    // Convert Set back to an array
    var uniqueTagsArray = Array.from(uniqueTagsSet);
    return {
        tags: uniqueTagsArray,
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
        const { title, URL, userid, user, creator, time, day, month, year, publisher, type, id, volume_title, volume, issue, page, edition, locator, tags } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            user: string
            creator: string
            time: string
            day: string
            month: string
            year: string
            publisher: string
            type: string
            id: string
            volume_title: string
            volume: string
            issue: string
            page: string
            edition: string
            locator: string
            tags: string
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
                    user,
                    creator,
                    last_updated: time,
                    date: {
                        year,
                        month,
                        day,
                    },
                    publisher,
                    type,
                    author,
                    volume_title,
                    volume,
                    issue,
                    page,
                    edition,
                    locator,
                    tags,
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources")
    },
}
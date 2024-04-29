import type { Actions } from "../$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author } from "@prisma/client"
import { importList } from "../../stores/sources"
import { get } from "svelte/store"

//@ts-ignore
export const load: PageServerLoad = async () => {
    const list = get(importList);
    //console.log(`Import List: ${list}`);
    let sources = await prisma.source.findMany({
        where: {
            id: { in: list },
        },
    })

    const sourcesAll = await prisma.source.findMany();

    // Initialize an empty array to store all tags
    let allTags: string[] = [];

    // Loop through each source object
    sourcesAll.forEach(source => {
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
        sources: sources,
        tags: uniqueTagsArray
    }
}

export const actions: Actions = {
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

        return
    },
    updateSource: async ({ request }) => {
        const formData = await request.formData();
        const { title, URL, userid, user, day, month, year, publisher, type, id, volume_title, volume, issue, page, edition, locator } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            user: string
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

        // Extract FormData entries
        const formDataEntries = formData.entries();

        // Initialize an array to store tag values
        const tagValues = [];

        // Iterate over FormData entries
        for (const [name, value] of formDataEntries) {
            // Check if the entry name is "tags"
            if (name === 'tags') {
                // Split the value by comma and add to tagValues array
                tagValues.push(value);
            }
        }

        // Flatten the tagValues array
        const flattenedTagValues = tagValues.flat();

        // Create a CSV string
        let tags: any = flattenedTagValues.join(',');
        if (tags == '') tags = null;
        // console.log(`tags: ${tags}.`);

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

        return
    },
}
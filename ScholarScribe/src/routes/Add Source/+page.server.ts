import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author } from "@prisma/client"
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-doi'
import '@citation-js/plugin-isbn'
import '@citation-js/plugin-csl'
import { Months } from "$lib/client/helper.funcs";


export const actions: Actions = {
    createSource: async ({ request }) => {
        const formData = await request.formData();
        const { title, URL, userid, user, day, month, year, publisher, type, volume_title, volume, issue, page, edition, locator } = Object.fromEntries(formData) as {
            title: string
            URL: string
            userid: string
            user: string
            day: string
            month: string
            year: string
            publisher: string
            type: string
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

        try {
            const source = await prisma.source.create({
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
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources");
    },
    importSource: async ({ request }) => {
        const formData = await request.formData();
        const { importType, importText, userid, user } = Object.fromEntries(formData) as {
            importType: string
            importText: string
            userid: string
            user: string
        }

        let output;
        if (importType == "doi") {
            try {
                let ref = new Cite(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch DOI info." })
            }
        }
        else if (importType == "isbn") {
            try {
                let ref = new Cite(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch ISBN info." })
            }
        }
        else {
            output = null;
        }

        const data = JSON.parse(output)[0];
        let date = data.issued['date-parts'][0];
        let title = data.title;
        let type = data.type;
        let URL = data.URL;
        let year;
        let month;
        let day;
        if (date[0] != null) year = String(date[0]);
        if (date[1] != null) month = Object.keys(Months).at(date[1] - 1);
        if (date[2] != null) day = String(date[2]);
        let publisher = data.publisher;
        let author = data.author;
        let volume = data.volume;
        let page = data.page;
        let volume_title = data["container-title"];
        let issue = data.issue;
        let edition = data.edition;
        let locator = data.locator;
        let id;
        try {
            const source = await prisma.source.create({
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
                },
            })
            id = source.id;
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, `/Validate/${id}`)
    },
}
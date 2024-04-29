import type { Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Author } from "@prisma/client";
// @ts-ignore
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-doi'
import '@citation-js/plugin-isbn'
import '@citation-js/plugin-csl'
import '@citation-js/plugin-bibtex'
import '@citation-js/plugin-software-formats';
import { Months } from "$lib/client/helper.funcs";
import { importList } from "../../stores/sources";
import { pushToDB } from "$lib/server/db.serve";

export const actions: Actions = {
    createSource: async ({ request }) => {
        const formData = await request.formData();
        const { title, URL, userid, user, creator, time, day, month, year, publisher, type, volume_title, volume, issue, page, edition, locator } = Object.fromEntries(formData) as {
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
            volume_title: string
            volume: string
            issue: string
            page: string
            edition: string
            locator: string
        }

        // Extracting numbAuthor as a number, assuming it's part of the form data
        ;
        const NUMB = Number(formData.get("numAuthors"));
        if (isNaN(NUMB)) {
            throw new Error("Invalid numbAuthor value");
        }
        if (NUMB < 1) {
            throw new Error("Invalid numbAuthor, must be at least 1");
        }
        const tags = formData.getAll('tags').toString().split(" "); 
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
                    tags,
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
        const { importType, importText, userid, user, creator, time } = Object.fromEntries(formData) as {
            importType: string
            importText: string
            userid: string
            user: string
            creator: string
            time: string
        }

        let output;
        if (importType == "doi") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch DOI info." })
            }
        }
        else if (importType == "isbn") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch ISBN info." })
            }
        }
        else if (importType == "bibtex") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch BibTex info." })
            }
        }
        else if (importType == "json") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch JSON info." })
            }
        }
        else if (importType == "npm") {
            try {
                let ref = await Cite.async(importText);
                output = ref.format('data');
            }
            catch (Error) {
                console.error(Error)
                return fail(500, { message: "Could not fetch NPM info." })
            }
        }
        else {
            return fail(500, { message: "No Import Type Selected!" })
        }

        let sourceList: string[] = [];

        const sources = JSON.parse(output);

        await sources.forEach(async (data: any) => {
            let response = await pushToDB(data, user, userid, creator, time);
            if (response == "Failed to send data!") {
                return fail(500, { message: "Failed to upload source to database" })
            }
            else {
                sourceList.push(response);
            }
        });

        await new Promise(f => setTimeout(f, 1000));
        importList.set(sourceList);
        throw redirect(303, `/Validate/`)
    },
    importFile: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        if (
            !(formData.fileToUpload as File).name ||
            (formData.fileToUpload as File).name === 'undefined'
        ) {
            return fail(400, {
                error: true,
                message: 'You must provide a file to upload'
            });
        }

        const { fileToUpload } = formData as { fileToUpload: File };
        const { userid, user, creator, time, } = formData as {
            userid: string
            user: string
            creator: string
            time: string
        };

        let template = await fileToUpload.text(); // The actual text file
        // console.log(template)
        let output;
        try {
            let ref = await Cite.async(template);
            output = ref.format('data');
        }
        catch (Error) {
            console.error(Error)
            return fail(500, { message: "Could not parse file data." })
        }

        // console.log(output);

        let sourceList: string[] = [];

        const sources = JSON.parse(output);

        await sources.forEach(async (data: any) => {
            let response = await pushToDB(data, user, userid, creator, time);
            if (response == "Failed to send data!") {
                return fail(500, { message: "Failed to upload source to database" })
            }
            else {
                sourceList.push(response);
            }
        });

        await new Promise(f => setTimeout(f, 1000));
        importList.set(sourceList);
        throw redirect(303, `/Validate/`)
    },
}
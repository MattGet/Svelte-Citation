import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { sourceList } from "../../stores/sources";
import { get } from "svelte/store";
import { fail, redirect } from "@sveltejs/kit";
import { cite, formatArrayToCSL } from "$lib/client/export.funcs";

export const load: PageServerLoad = async () => {
    try {
        // Fetch data from Prisma using the selected source IDs
        const fetchedSources = await prisma.source.findMany();
        return {
            sources: fetchedSources,
        };
    } catch (error) {
        console.error("Error loading data:", error);
        throw new Error("Failed to load data from Prisma.");
    }
};

export const actions: Actions = {
    citeBib: async ({ request }) => {
        const formData = await request.formData();
        const { style } = Object.fromEntries(formData) as {
            style: string,
        }

        const sourceList = JSON.parse(formData.get('sourceList') as string);

        let selection = [];
        try {
            selection = await prisma.source.findMany({
                where: {
                    id: { in: sourceList },
                },
            });
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not cite article." })
        }
        // console.log(sourceList);

        const csl = formatArrayToCSL(selection)
        // console.log(csl);
        // console.log(`Formatting citation in ${style}.`)
        let data = cite(csl, style);


        //console.log(data);
        let bib = JSON.stringify(data);
        //console.log(bib);
        return { bib };
    },
}
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { sourceList } from "../../stores/sources";
import { get } from "svelte/store";

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


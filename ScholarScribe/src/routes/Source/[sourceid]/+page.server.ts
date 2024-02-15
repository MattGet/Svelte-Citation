import type { PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail } from "@sveltejs/kit"

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
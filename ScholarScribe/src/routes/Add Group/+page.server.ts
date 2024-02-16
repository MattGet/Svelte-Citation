import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail } from "@sveltejs/kit"

export const actions: Actions = {
    createGroup: async ({ request }) => {
        const { title, userid, description, sourceids } = Object.fromEntries(await request.formData()) as {
            title: string
            userid: string
            description: string
            sourceids: string
        }
        try {
            await prisma.group.create({
                data: {
                    title,
                    userid,
                    description
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the group." })
        }
        return {
            status: 201

        }
    }
}
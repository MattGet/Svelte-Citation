import type { Actions } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import type { Author } from "@prisma/client"
import '@citation-js/plugin-doi'
import '@citation-js/plugin-isbn'
import '@citation-js/plugin-csl'



export const actions: Actions = {
    creategroup: async ({ request }) => {
        const formData = await request.formData();
        const { title, userid, genDel, genre, tags, isPublic } = Object.fromEntries(formData) as {
            title: string
            userid: string
            genDel: string
            genre: string
            tags: string
            isPublic:string 
        }

        // Extracting numbAuthor as a number, assuming it's part of the form data
        
       
        
        try {
            const group = await prisma.group.create({
                data: {
                  title,
                  userid,
                  genDel,
                  genre,
                  tags,
                  isPublic
                },
            })
        } catch (err) {
            console.error(err)
            return fail(500, { message: "Could not create the article." })
        }

        redirect(303, "/Sources");
    },
}
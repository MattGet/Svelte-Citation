import type { Actions } from "./$types"
import {prisma} from 'lib/server/prisma'
export const actions: Actions = {
    createGroup: async ({request}) => {
        const {title, genre, description,sourceids} = Object.fromEntries(await request.formData()) as {
            title: string 
            genre: string
            description:string
            sourceids: string
        }
        try {
            await prisma.group.create({
                data:{
                    title,
                    genre,
                    description 
                }
            })
        } catch(err){
            console.error(err)
            return fail((500,{ message: "Could not create the group."}))
        }
        return {
            status:201

        }
    }
}
import type { Action } from '@sveltejs/kit';


export const actions: { createGroup: Action } = {
    createGroup: async ({ request }) => {
        const formData = new URLSearchParams(await request.text());
        const title = formData.get('title');
        const userid = formData.get('userid');
        const genDel = formData.get('genDel');
        const isPublic = formData.get('isPublic') === 'true';

        try {
            const createdGroup = await prisma.group.create({
                data: {
                    title,
                    userid,
                    genDel,
                    isPublic,
                    type: 'webpage',
                },
            });

            return {
                status: 303,
                headers: {
                    location: '/Groups', // Redirect to the Groups page after successful creation
                },
            };
        } catch (error) {
            console.error('Error creating group:', error);
            return {
                status: 500,
                body: { message: 'Could not create the group.' },
            };
        }
    }
};
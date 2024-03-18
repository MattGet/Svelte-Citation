import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { handleClerk } from 'clerk-sveltekit/server'
import { CLERK_SECRET_KEY } from '$env/static/private'

//export const handle: Handle = sequence(

//)

export const handle: Handle = async ({ event, resolve }) => {

    handleClerk(CLERK_SECRET_KEY, {
        debug: true,
        protectedPaths: ['/Admin'],
        signInUrl: '/Login',
    })


    let theme = '';

    const cookieTheme = event.cookies.get('theme');

    if (cookieTheme) {
        theme = cookieTheme;
    } else {
        event.cookies.set('theme', 'hamlindigo', { path: '/' });
        theme = 'hamlindigo';
    }

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
    });
};
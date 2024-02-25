import type { Actions } from './$types';

export const actions: Actions = {
    // This action is called when the user clicks the theme button
    //@ts-ignore
    setTheme: async ({ cookies, request }) => {
        const formData = await request.formData();
        const theme = formData.get('theme')?.toString() ?? 'hamlindigo';
        // Sets the selected theme to the cookie
        cookies.set('theme', theme, { path: '/' });
        return { theme };
    }
};

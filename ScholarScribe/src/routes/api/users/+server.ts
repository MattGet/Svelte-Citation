import { _getUser } from '$lib/server/users.js'


export const GET = async ({ request, url }) => {
    const id = String(url.searchParams.get('userid') ?? '10')

    const res = _getUser(id)
    const data = JSON.stringify(res)
    return new Response(data, { status: 200 })
}
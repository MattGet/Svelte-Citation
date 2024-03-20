import { CLERK_SECRET_KEY } from '$env/static/private';
import { Clerk } from '@clerk/backend';

const clerk = Clerk({ secretKey: CLERK_SECRET_KEY });
let Users = await clerk.users.getUserList();

export default Users;
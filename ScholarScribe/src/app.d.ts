// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PrismaClient } from "@prisma/client/extension";

// and what to do when importing types
declare global {
	declare namespace App {
		// interface Locals {}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
	var prisma: PrismaClient
}

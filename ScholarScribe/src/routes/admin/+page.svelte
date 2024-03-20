<script lang="ts">
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import type { PageData } from './$types';
	import UserTable from '$lib/components/UserTable/UserTable.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';

	export let data: PageData;
	$: ({ users } = data);
</script>

<AdminBanner />
<ClerkLoaded let:clerk>
	{#if clerk?.user?.organizationMemberships[0]?.organization.name == 'Scholar Scribe' || clerk?.user?.publicMetadata.role == 'Admin'}
		<UserTable {users} />
	{:else}
		<p>Not Authorized</p>
	{/if}
</ClerkLoaded>

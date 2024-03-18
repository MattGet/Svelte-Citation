<script lang="ts">
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ users } = data);
</script>

<ClerkLoaded let:clerk>
	{#each users as user}
		<br />
		{user.firstName}
	{/each}
</ClerkLoaded>

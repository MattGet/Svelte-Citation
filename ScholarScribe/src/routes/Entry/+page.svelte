<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ sources } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
</script>

<div class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Congrats the entry Form worked</h1>
	<p>A Web Based Citation Engine</p>
	<section>
        {#each sources as source, i}
		<td>{source.type}</td>
		<td>{source.title}</td>
		<td>{source.authorFirstName}</td>
		<td>{source.authorLastName}</td>
        {/each}
	</section>
</div>
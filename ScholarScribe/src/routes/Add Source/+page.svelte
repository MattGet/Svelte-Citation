<script lang="ts">
	import BookForm from '$lib/components/BookForm.svelte';
	import JournalForm from '$lib/components/JournalForm.svelte';
	import WebForm from '$lib/components/WebForm.svelte';
	import PatentForm from '$lib/components/PatentForm.svelte';
	import MagazineForm from '$lib/components/MagazineForm.svelte';
	import '../../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	let form = 'webpage';
	
</script>

<SignedIn let:user>
	<div class="space px-10 pt-10">
		<select class="select" size="1" bind:value={form}>
			<option value="webpage">Website</option>
			<option value="journal">Journal</option>
			<option value="book">Book</option>
			<option value="patent">Patent</option>
			<option value="magazine">Editorial</option>
		</select>
	</div>

	{#if form == 'webpage'}
		<WebForm user={user?.id} />
	{:else if form == 'journal'}
		<JournalForm user={user?.id} />
	{:else if form == 'book'}
		<BookForm user={user?.id} />
	{:else if form == 'patent'}
		<PatentForm user={user?.id} />
	{:else if form == 'magazine'}
		<MagazineForm user={user?.id} />
	{:else}
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-red-500 to-orange-300 bg-clip-text text-transparent box-decoration-clone"
				>Error: Form Not Found!</span
			>
		</h1>
	{/if}
</SignedIn>

<SignedOut></SignedOut>

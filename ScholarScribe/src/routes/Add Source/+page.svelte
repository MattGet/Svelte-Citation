<script lang="ts">
	import BookForm from '$lib/components/Forms/BookForm.svelte';
	import JournalForm from '$lib/components/Forms/JournalForm.svelte';
	import WebForm from '$lib/components/Forms/WebForm.svelte';
	import PatentForm from '$lib/components/Forms/PatentForm.svelte';
	import MagazineForm from '$lib/components/Forms/MagazineForm.svelte';
	import Import from '$lib/components/Forms/Import.svelte';
	import '../../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	let formType = 'import';
	export let form;
</script>

<SignedIn let:user>
	<div class="space px-10 pt-10">
		<select class="select" size="1" bind:value={formType}>
			<option value="import">Import</option>
			<option value="webpage">Website</option>
			<option value="journal">Journal</option>
			<option value="book">Book</option>
			<option value="patent">Patent</option>
			<option value="magazine">Editorial</option>
		</select>
	</div>

	{#if form?.message}
		<div class="flex justify-center pt-8">
			<div class="card p-4 variant-filled-error" style="width: 50%;">
				<h4 class="h4" style="text-align: center;">{form.message}</h4>
			</div>
		</div>
	{/if}
	{#if formType == 'import'}
		<Import {user} />
	{:else if formType == 'webpage'}
		<WebForm {user} />
	{:else if formType == 'journal'}
		<JournalForm {user} />
	{:else if formType == 'book'}
		<BookForm {user} />
	{:else if formType == 'patent'}
		<PatentForm {user} />
	{:else if formType == 'magazine'}
		<MagazineForm {user} />
	{:else}
		<h1 class="h1">
			<span
				class="bg-gradient-to-br from-red-500 to-orange-300 bg-clip-text text-transparent box-decoration-clone"
				>Error: Form Not Found!</span
			>
		</h1>
	{/if}
</SignedIn>

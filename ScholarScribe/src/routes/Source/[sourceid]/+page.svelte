<script lang="ts">
	import Author from '$lib/components/Author.svelte';
	import type { PageData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { suffixMe } from '$lib/client/helper.funcs';
	//@ts-ignore
	import { Cite } from '@citation-js/core';
	import '@citation-js/plugin-bibtex';



	export let data: PageData;
	$: ({ source } = data);

	let copied = false;

	function onClickHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<div class="p-10">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>Source Information</span
		>
	</h1>
	<div class="space-y-4 p-10">
		<h4 class="h4">Title: {source.title}</h4>
		{#if source.URL != null && source.URL != ''}
			<h4 class="h4">
				URL: <a href={source.URL} target="_blank" rel="noreferrer noopener">{source.URL}</a>
			</h4>
		{/if}
		{#each source.author as author, i}
			<h4 class="h4">Author {i + 1}: {author.given} {author.family} {author.suffix}</h4>
		{/each}
		{#if source.date != null && source.date != '' && source.date.year != null && source.date.year != ''}
			<h4 class="h4">Date: {source.date.month} {suffixMe(source.date.day)} {source.date.year}</h4>
		{/if}
		{#if source.publisher != null && source.publisher != ''}
			<h4 class="h4">Publisher: {source.publisher}</h4>
		{/if}
	</div>
	<div class="container mx-auto p-8 space-y-8">
		<section class="flex flex-row gap-4">
			<a class="btn variant-filled-tertiary" href="/Update/{source.id}">Update</a>
			<form action="?/deleteSource&id={source.id}" method="POST">
				<button type="submit" class="btn variant-filled-error">Delete</button>
			</form>
			<a class="btn variant-filled-primary" href="/Sources">Back to Sources</a>
			<button
				use:clipboard={window.location.href}
				class="btn variant-filled-secondary"
				on:click={onClickHandler}
				disabled={copied}
			>
				{copied ? 'Copied 👍' : 'Copy Link'}
			</button>
		</section>
	</div>
	<h4 class="h4">Citations</h4>
</div>

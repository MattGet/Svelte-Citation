<script lang="ts">
	// @ts-nocheck
	import type { PageData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { suffixMe } from '$lib/client/helper.funcs';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import CopyButton from '$lib/components/CopyButton.svelte';

	export let data: PageData;
	$: ({ source } = data);
	let link;
	if (typeof window !== 'undefined') {
		link = String(window.location.href);
	} else {
		link = 'https://ramen.valpo.edu';
	}

	const submit: SubmitFunction = async ({ cancel }) => {
		if (confirm('Are you sure you want to delete this post?')) {
			return async ({ update }) => {
				return update();
			};
		} else {
			cancel();
		}
	};
</script>

<AdminBanner />

<div class="p-10">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>Source Information</span
		>
	</h1>
	<div class="space-y-4 p-10">
		<h4 class="h4">Type: {source?.type}</h4>
		<h4 class="h4">Created By: {JSON.parse(source?.user ?? '')?.fullName}</h4>
		<h4 class="h4">Title: {source?.title}</h4>
		{#if source?.URL != null && source?.URL != ''}
			<h4 class="h4">
				URL: <a href={source.URL} target="_blank" rel="noreferrer noopener">{source.URL}</a>
			</h4>
		{/if}
		<h4 class="h4">Authors:</h4>
		{#each source?.author as author, i}
			<h4 class="h4">
				&emsp;Author {i + 1}: {author.given ?? ''}
				{author.dropping_particle ?? ''}
				{author.non_dropping_particle ?? ''}
				{author.family ?? ''}
				{author.suffix ?? ''}
				{author.comma_suffix ?? ''}
			</h4>
		{/each}
		{#if source?.composer != null && source.composer != ''}
			<h4 class="h4">Composers:</h4>
			{#each source?.composer as composer, i}
				<h4 class="h4">
					&emsp;Composer {i + 1}: {composer.given ?? ''}
					{composer.dropping_particle ?? ''}
					{composer.non_dropping_particle ?? ''}
					{composer.family ?? ''}
					{composer.suffix ?? ''}
					{composer.comma_suffix ?? ''}
				</h4>
			{/each}
		{/if}
		{#if source?.editor != null && source.editor != ''}
			<h4 class="h4">Editors:</h4>
			{#each source?.editor as editor, i}
				<h4 class="h4">
					&emsp;Editor {i + 1}: {editor.given ?? ''}
					{editor.dropping_particle ?? ''}
					{editor.non_dropping_particle ?? ''}
					{editor.family ?? ''}
					{editor.suffix ?? ''}
					{editor.comma_suffix ?? ''}
				</h4>
			{/each}
		{/if}
		{#if source?.performer != null && source.performer != ''}
			<h4 class="h4">Performers:</h4>
			{#each source?.performer as performer, i}
				<h4 class="h4">
					&emsp;Performer {i + 1}: {performer.given ?? ''}
					{performer.dropping_particle ?? ''}
					{performer.non_dropping_particle ?? ''}
					{performer.family ?? ''}
					{performer.suffix ?? ''}
					{performer.comma_suffix ?? ''}
				</h4>
			{/each}
		{/if}
		{#if source?.date != null && source.date.year != null && source.date.year != ''}
			<h4 class="h4">
				Date: {source.date.month ?? ''}
				{suffixMe(Number(source.date.day) ?? 0)}
				{source.date.year ?? ''}
			</h4>
		{/if}
		{#if source?.publisher != null && source.publisher != ''}
			<h4 class="h4">Publisher: {source.publisher}</h4>
		{/if}
		{#if source?.language != null && source.language != ''}
			<h4 class="h4">
				Language: {source.language ?? ''}
			</h4>
		{/if}
		{#if source?.volume_title != null && source.volume_title != ''}
			<h4 class="h4">
				Volume Title: {source.volume_title ?? ''}
			</h4>
		{/if}
		{#if source?.journalAbbreviation != null && source.journalAbbreviation != ''}
			<h4 class="h4">
				Abbreviation: {source.journalAbbreviation ?? ''}
			</h4>
		{/if}
		{#if source?.issue != null && source.issue != ''}
			<h4 class="h4">
				Issue: {source.issue ?? ''}
			</h4>
		{/if}
		{#if source?.volume != null && source.volume != ''}
			<h4 class="h4">
				Volume Number: {source.volume ?? ''}
			</h4>
		{/if}
		{#if source?.edition != null && source.edition != ''}
			<h4 class="h4">
				Edition: {source.edition ?? ''}
			</h4>
		{/if}
		{#if source?.version != null && source.version != ''}
			<h4 class="h4">
				Version: {source.version ?? ''}
			</h4>
		{/if}
		{#if source?.page != null && source.page != ''}
			<h4 class="h4">
				Pages: {source.page ?? ''}
			</h4>
		{/if}
		{#if source?.tags != null && source?.tags != ''}
			<h4 class="h4">
				Tags: {source.tags ?? ''}
			</h4>
		{/if}
		{#if source?.abstract != null && source.abstract != ''}
			<h4 class="h4">
				Abstract: {source.abstract ?? ''}
			</h4>
		{/if}
		{#if source?.DOI != null && source.DOI != ''}
			<h4 class="h4">
				DOI: {source.DOI ?? ''}
			</h4>
		{/if}
		{#if source?.ISBN != null && source.ISBN != ''}
			<h4 class="h4">
				ISBN: {source.ISBN ?? ''}
			</h4>
		{/if}
		{#if source?.ISSN != null && source.ISSN != ''}
			<h4 class="h4">
				ISSN: {source.ISSN ?? ''}
			</h4>
		{/if}
	</div>
	<div class="container mx-auto p-8 space-y-8">
		<section class="flex flex-row gap-4">
			<ClerkLoaded let:clerk>
				{#if clerk?.user?.publicMetadata.role == 'Admin' || clerk?.user?.id == source?.userid}
					<a class="btn variant-filled-tertiary" href="/Update/{source?.id}">Update</a>
					<form action="?/deleteSource&id={source?.id}" method="POST" use:enhance={submit}>
						<button type="submit" class="btn variant-filled-error">Delete</button>
					</form>
				{/if}
			</ClerkLoaded>
			<a class="btn variant-filled-primary" href="/Sources">Back to Sources</a>
			<CopyButton data={link} buttonName="Copy Link" />
		</section>
	</div>
</div>

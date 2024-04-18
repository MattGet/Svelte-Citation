<script lang="ts">
	// @ts-nocheck
	import type { PageData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { suffixMe } from '$lib/client/helper.funcs';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	export let data: PageData;
	$: ({ source } = data);

	let copied = false;

	function onClickHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
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
		<h4 class="h4">Created By: {JSON.parse(source?.user ?? '')?.fullName}</h4>
		<h4 class="h4">Title: {source?.title}</h4>
		{#if source?.URL != null && source?.URL != ''}
			<h4 class="h4">
				URL: <a href={source.URL} target="_blank" rel="noreferrer noopener">{source.URL}</a>
			</h4>
		{/if}
		{#each source?.author as author, i}
			<h4 class="h4">
				Author {i + 1}: {author.given ?? ''}
				{author.family ?? ''}
				{author.suffix ?? ''}
			</h4>
		{/each}
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
		{#if source?.volume_title != null && source.volume_title != ''}
			<h4 class="h4">
				Volume Title: {source.volume_title ?? ''}
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
		{#if source?.page != null && source.page != ''}
			<h4 class="h4">
				Pages: {source.page ?? ''}
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
			{#if window.isSecureContext}
				<button
					use:clipboard={window.location.href}
					class="btn variant-filled-secondary"
					on:click={onClickHandler}
					disabled={copied}
				>
					{copied ? 'Copied 👍' : 'Copy Link'}
				</button>
			{/if}
		</section>
	</div>
</div>

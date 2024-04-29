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
	import { sourceList } from '../../../stores/sources';

	export let data: PageData;
	$: ({ group } = data);
	$: ({ sources } = data);
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

	function exportGroup() {
		let list = {}; // Initialize list as an empty object

		sources.forEach((source) => {
			list[source.id] = true;
		});

		sourceList.set(list); // Assuming this is correct

		window.location.href = '/CSL';
	}
</script>

<div class="p-10">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>Group Information</span
		>
	</h1>
	<div class="space-y-4 p-10">
		<h4 class="h4">Title: {group?.title}</h4>
		<h4 class="h4">Created By: {JSON.parse(group?.user ?? '')?.fullName}</h4>
		<h4 class="h4">Main Genre: {group?.genDel}</h4>
		<h4 class="h4">Other Genre:</h4>
		{#each group?.genre as genre, i}
			<h4 class="h4">
				&emsp;{genre}
			</h4>
		{/each}
		{#if sources != null && sources != ''}
			<h4 class="h4">Sources:</h4>
			<!-- Responsive Container (recommended) -->
			<div class="table-container px-10 pb-10">
				<!-- Native Table Element -->
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Created By</th>
							<th>Citation Type</th>
							<th>Title</th>
							<th>Authors</th>
							<th>Tags</th>
							<th>View</th>
						</tr>
					</thead>
					<tbody>
						{#each sources as source, i}
							<tr>
								<td>{JSON.parse(source.user ?? '')?.fullName}</td>
								<td>{source.type}</td>
								<td
									>{source.title.length > 30
										? source.title.substring(0, 30) + '...'
										: source.title}</td
								>
								<td>{source.author[0]?.given} {source.author[0]?.family}</td>
								<td>{source.tags}</td>
								<td>
									<a class="btn variant-filled-secondary" href="/Source/{source.id}">View</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
	<div class="container mx-auto px-8 space-y-8">
		<section class="flex flex-row gap-4">
			<ClerkLoaded let:clerk>
				{#if clerk?.user?.publicMetadata.role == 'Admin' || clerk?.user?.id == group?.userid}
					<form action="?/deleteGroup&id={group?.id}" method="POST" use:enhance={submit}>
						<button type="submit" class="btn variant-filled-error">Delete</button>
					</form>
				{/if}
			</ClerkLoaded>
			<a class="btn variant-filled-primary" href="/Groups">Back to Groups</a>
			<CopyButton data={link} buttonName="Copy Link" />
			<button class="btn variant-filled-primary" on:click={exportGroup}>Export</button>
		</section>
	</div>
</div>

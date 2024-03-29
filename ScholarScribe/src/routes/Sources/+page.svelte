<script lang="ts">
	import type { PageData } from './$types';
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: ({ sources } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let valueSingle: string = 'JSON';

	function routeExport(source: any) {
		if (valueSingle == 'JSON') {
			exportJSON(source);
		} else if (valueSingle == 'BibTex') {
			exportBibTex(source);
		} else {
		}
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
<div class="space px-10 py-10">
	<h1>Export Type</h1>
	<select class="select" size="1" bind:value={valueSingle}>
		<option value="JSON">JSON</option>
		<option value="BibTex">BibTex</option>
		<option value="Other">Other</option>
	</select>
</div>
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
				<th>View</th>
				<SignedIn>
					<th>Update</th>
					<th>Delete</th>
				</SignedIn>
				<th>Export</th>
			</tr>
		</thead>
		<tbody>
			{#each sources as source, i}
				<tr>
					<td>{JSON.parse(source.user ?? '')?.fullName}</td>
					<td>{source.type}</td>
					<td>{source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}</td>
					<td>{source.author[0]?.given} {source.author[0]?.family}</td>
					<td>
						<a class="btn variant-filled-secondary" href="/Source/{source.id}">View</a>
					</td>
					<SignedIn let:user>
						{#if user?.publicMetadata.role == 'Admin' || user?.id == source.userid}
							<td>
								<a class="btn variant-filled-tertiary" href="/Update/{source.id}">Update</a>
							</td>
							<td>
								<form action="?/deleteSource&id={source.id}" method="POST" use:enhance={submit}>
									<button type="submit" class="btn variant-filled-error">Delete</button>
								</form>
							</td>
						{:else}
							<td><!-- <div class="variant-filled-tertiary p-3">Not Owner</div> --></td>
							<td><!-- <div class="variant-filled-error p-3">Not Owner</div> --></td>
						{/if}
					</SignedIn>
					<td>
						<button class="btn variant-filled" on:click={() => routeExport(source)}>Export</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<SignedIn let:user>
		<div class="flex width-full justify-center p-10">
			<a href="/Add Source" class="btn variant-filled" data-sveltekit-preload-data="hover"
				>Add New Source
			</a>
		</div>
	</SignedIn>
</div>

<style lang="scss">
	td {
		padding: 5px;
		justify-content: center;
		text-align: center;
		align-items: center;
		vertical-align: middle;
	}
	th {
		padding: 5px;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
</style>

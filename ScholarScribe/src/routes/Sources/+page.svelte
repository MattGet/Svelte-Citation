<script lang="ts">
	import type { PageData } from './$types';
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';

	export let data: PageData;

	$: ({ sources } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	let valueSingle: string = 'JSON';

	function routeExport(source: any) {
		if (valueSingle == 'JSON') {
			exportJSON(source);
		} else if (valueSingle == 'BibTex') {
			exportBibTex(source);
		} else {
		}
	}
</script>

<div class="space px-10 py-10">
	<h1>Export Type</h1>
	<select class="select" size="1" bind:value={valueSingle}>
		<option value="JSON">JSON</option>
		<option value="BibTex">BibTex</option>
		<option value="Other">Other</option>
	</select>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Citation Type</th>
				<th>Title</th>
				<th>Author</th>
				<th>More</th>
				<th>Delete</th>
				<th>Export</th>
			</tr>
		</thead>
		<tbody>
			{#each sources as source, i}
				<tr>
					<td>{source.type}</td>
					<td>{source.title}</td>
					<td>{source.authorFirstName} {source.authorLastName}</td>
					<td>
						<a class="btn variant-filled-secondary" href="/Source/{source.id}">View</a>
					</td>
					<td>
						<form action="?/deleteSource&id={source.id}" method="POST">
							<button type="submit" class="btn variant-filled-error">Delete</button>
						</form>
					</td>
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

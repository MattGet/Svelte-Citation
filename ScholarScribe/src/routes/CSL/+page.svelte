<script lang="ts">
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { selectedSources } from '$lib/client/helper.funcs';

	let valueSingle: string = 'JSON';
	export let data: PageData;

	let sourceIds: string[];
	$: ({ sources } = data);
	let selection = selectedSources();

	function routeExport(source: any) {
		if (valueSingle === 'JSON') {
			exportJSON(source);
		} else if (valueSingle === 'BibTex') {
			exportBibTex(source);
		} else if (valueSingle === 'Bibliography') {
			const sourceId = JSON.stringify(source.id);
			redirect(300, `/CSL/${sourceId}`);
		}
	}

	function test() {
		console.log(selectedSources());
		console.log(data);
	}
</script>

<div class="space px-10 py-10">
	<h1>Export Type</h1>
	<select class="select" size="1" bind:value={valueSingle}>
		<option value="JSON">JSON</option>
		<option value="BibTex">BibTex</option>
		<option value="Bibliography">Bibliography</option>
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
				<!-- <th>Export</th> -->
			</tr>
		</thead>
		<tbody>
			{#each sources as source, i}
				{#if selection.includes(source.id)}
					<tr>
						<td>{JSON.parse(source.user ?? '')?.fullName}</td>
						<td>{source.type}</td>
						<td
							>{source.title.length > 30 ? source.title.substring(0, 30) + '...' : source.title}</td
						>
						<td>{source.author[0]?.given} {source.author[0]?.family}</td>
						<td>
							<a class="btn variant-filled-secondary" href="/Source/{source.id}">View</a>
						</td>
						<!-- <td><button class="btn variant-filled" on:click={() => routeExport(source)}>Export</button></td> -->
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</div>
<div class="flex width-full justify-center pb-10 px-10">
	<a href="/Sources" class="btn variant-filled" data-sveltekit-preload-data="hover"
		>Return to Source List
	</a>
</div>

<script lang="ts">
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	import { selectedSources } from '$lib/client/helper.funcs';
	import { exportType, bibStyle } from '../../stores/sources';
	import { get } from 'svelte/store';

	export let data: PageData;
	export let form;

	let sourceIds: string[];
	$: ({ sources } = data);
	let selection = selectedSources();

	// Function to handle changes in selection
	function handleChange(event: any) {
		console.log(event.target.value);
		exportType.update(event.target.value);
	}

	function handleChange2(event: any) {
		console.log(event.target.value);
		bibStyle.update(event.target.value);
	}

	function test() {
		console.log(selectedSources());
		console.log(data);
	}
</script>

<div class="space px-10 py-10">
	<h1 class="h3">Export Type:</h1>
	<select class="select" size="1" on:change={handleChange} bind:value={$exportType}>
		<option value="JSON">JSON</option>
		<option value="BibTex">BibTex</option>
		<option value="Bibliography">Bibliography</option>
	</select>
</div>

<hr class="pb-10" />

{#if $exportType == 'Bibliography'}
	<h1 class="h3 px-10">Export Bibliography</h1>
	<form class="form p-10" action="?/citeBib" method="POST">
		<span class="h4">Select Style:</span>
		<div class="flex gap-10">
			<select
				class="select"
				style="width: 300px"
				size="1"
				on:change={handleChange2}
				bind:value={$bibStyle}
			>
				<input class="input" name="style" placeholder="Select Style" />
				<option value="apa">APA</option>
				<option value="harvard">Harvard</option>
				<option value="vancouver">Vancouver</option>
			</select>
			<input type="hidden" name="sourceList" value={JSON.stringify(selection)} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
	<div class="px-10">
		<div class="card p-5">
			<h4 class="h4 pb-5">Bibliography:</h4>
			{#if form?.bib}
				{#each JSON.parse(form?.bib) as bib}
					{@html bib[1]}
					<br />
				{/each}
			{/if}
		</div>
	</div>
{:else if $exportType == 'BibTex'}
	<h1 class="h3 px-10">Export BibTex</h1>
{:else if $exportType == 'JSON'}
	<h1 class="h3 px-10">Export JSON</h1>
{/if}

<br />
<h2 class="h3 px-10 pb-5">Selected Sources:</h2>
<!-- Responsive Container (recommended) -->
<div class="table-container px-10">
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
							>{source.title?.length ?? 30 > 30
								? source.title?.substring(0, 30) + '...'
								: source.title}</td
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
<div class="flex width-full justify-center p-10">
	<a href="/Sources" class="btn variant-filled" data-sveltekit-preload-data="hover"
		>Return to Source List
	</a>
</div>

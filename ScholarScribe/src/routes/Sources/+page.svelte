<script lang="ts">
	// @ts-nocheck
	import type { PageData } from './$types';
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';
	import { applyAction, enhance } from '$app/forms';
	import { DataHandler } from '@vincjo/datatables';
	import Search from '$lib/components/DataTableLocal/Search.svelte';
	import ThFilter from '$lib/components/DataTableLocal/ThFilter.svelte';
	import ThSort from '$lib/components/DataTableLocal/ThSort.svelte';
	import RowCount from '$lib/components/DataTableLocal/RowCount.svelte';
	import RowsPerPage from '$lib/components/DataTableLocal/RowsPerPage.svelte';
	import Pagination from '$lib/components/DataTableLocal/Pagination.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import { type SubmitFunction } from '@sveltejs/kit';
	import { sourceList } from '../../stores/sources';
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let data: PageData;

	const handler = new DataHandler(data.sources, { rowsPerPage: 5 });
	const rows = handler.getRows();
	$: ({ sources } = data);

	const submit: SubmitFunction = async ({ cancel }) => {
		if (confirm('Are you sure you want to delete this post?')) {
			return async ({ result }) => {
				return await applyAction(result);
			};
		} else {
			cancel();
		}
	};

	// Function to handle checkbox change
	function handleCheckboxChange(event: Event, id: string) {
		sourceList.update((existingCheckedState) => ({
			...existingCheckedState,
			[id]: (event.target as HTMLInputElement).checked
		}));
		console.log($sourceList);
	}

	// Function to populate the store with all checkboxes
	function populateStoreWithCheckboxes(data: boolean) {
		const list2: Record<string, boolean> = $sourceList;

		sources.forEach((source) => {
			if (!(source.id in list2)) {
				list2[source.id] = data;
			}
		});

		sourceList.set(list2);
	}

	// Function to handle "Select All" button click
	function selectAll() {
		populateStoreWithCheckboxes(true);
		sourceList.update((existingCheckedState) => {
			const newCheckedState = { ...existingCheckedState };
			Object.keys(newCheckedState).forEach((key) => {
				newCheckedState[key] = true;
			});
			return newCheckedState;
		});
	}

	// Function to handle "Deselect All" button click
	function deselectAll() {
		populateStoreWithCheckboxes(false);
		sourceList.update((existingCheckedState) => {
			const newCheckedState = { ...existingCheckedState };
			Object.keys(newCheckedState).forEach((key) => {
				newCheckedState[key] = false;
			});
			return newCheckedState;
		});
	}

	// Derive a store to check if any item is selected
	const anySourceSelected = derived(sourceList, ($sourceList) => {
		return Object.values($sourceList).some((checked) => checked);
	});

	let tagFilter: string;
	function handleTagSort(value2: string) {
		// console.log(value2);
		handler.filter(value2, 'tags');
		tagFilter = value2;
	}
</script>

<AdminBanner />

<div class=" overflow-x-auto space-y-4 p-10">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<button class="btn variant-filled-primary" on:click={selectAll}>Select All</button>
		<button class="btn variant-filled-secondary" on:click={deselectAll}>Deselect All</button>
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<th>Select</th>
				<ThSort {handler} orderBy="creator">Created By</ThSort>
				<ThSort {handler} orderBy="type">Source Type</ThSort>
				<ThSort {handler} orderBy="title">Title</ThSort>
				<ThSort {handler} orderBy="author">Author</ThSort>
				<ThSort {handler} orderBy="last_updated">Last Updated</ThSort>
				<th>Tags</th>
				<th>View</th>
				<SignedIn>
					<th>Update</th>
					<th>Delete</th>
				</SignedIn>
			</tr>
			<tr>
				<hr />
			</tr>
			<tr>
				<th />
				<ThFilter {handler} filterBy="creator" />
				<ThFilter {handler} filterBy="type" />
				<ThFilter {handler} filterBy="title" />
				<ThFilter {handler} filterBy="author" />
				<ThFilter {handler} filterBy="last_updated" />
				<ThFilter {handler} filterBy="tags" value={tagFilter} />
				<th />
				<SignedIn>
					<th></th>
					<th></th>
				</SignedIn>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td
						><input
							type="checkbox"
							class="p-4"
							bind:checked={$sourceList[row.id]}
							on:change={(e) => handleCheckboxChange(e, row.id)}
						/></td
					>
					<td>{row.creator}</td>
					<td>{row.type}</td>
					<td>{row.title.length > 30 ? row.title.substring(0, 50) + '...' : row.title}</td>
					<td>{row.author[0]?.given} {row.author[0]?.family}</td>
					<td>{new Date(Number(row.last_updated ?? '')).toLocaleString()}</td>
					<td>
						{#if row && row.tags}
							<div>
								{#each row.tags.split(',') as tag}
									<button class="btn variant-filled-secondary p-1 m-1" on:click={handleTagSort(tag)}
										>{tag}</button
									>
								{/each}
							</div>
						{:else}
							<div class="card justify-center variant-filled">
								<!-- Handle case when row or row.tags is not available -->
								<p class="p-2">No Tags</p>
							</div>
						{/if}
					</td>
					<td>
						<a class="btn variant-filled-secondary" href="/Source/{row.id}">View</a>
					</td>
					<SignedIn let:user>
						{#if user?.publicMetadata.role == 'Admin' || user?.id == row.userid}
							<td>
								<a class="btn variant-filled-tertiary" href="/Update/{row.id}">Update</a>
							</td>
							<td>
								<form action="?/deleteSource&id={row.id}" method="POST">
									<button type="submit" class="btn variant-filled-error">Delete</button>
								</form>
							</td>
						{:else}
							<td><!-- <div class="variant-filled-tertiary p-3">Not Owner</div> --></td>
							<td><!-- <div class="variant-filled-error p-3">Not Owner</div> --></td>
						{/if}
					</SignedIn>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<SignedIn let:user>
			<a href="/Add Source" class="btn variant-filled" data-sveltekit-preload-data="hover"
				>Add New Source
			</a>
		</SignedIn>
		<Pagination {handler} />
	</footer>
</div>

<!-- Responsive Container (recommended) -->
<div class="table-container px-10 pb-10">
	<!-- Native Table Element -->
	<!-- <table class="table table-hover">
		<thead>
			<tr>
				<th>Select</th>
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
					<td
						><input
							type="checkbox"
							class="p-4"
							bind:checked={$sourceList[source.id]}
							on:change={(e) => handleCheckboxChange(e, source.id)}
						/></td
					>
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
							<td> <div class="variant-filled-tertiary p-3">Not Owner</div> </td>
							<td> <div class="variant-filled-error p-3">Not Owner</div> </td>
						{/if}
					</SignedIn>
					 <td><button class="btn variant-filled" on:click={() => routeExport(source)}>Export</button></td> 
				</tr>
			{/each}
		</tbody>
	</table> -->
</div>

<div class="fixed bottom-0" hidden={!$anySourceSelected}>
	<TabGroup
		justify="justify-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		flex="flex-1 lg:flex-none"
		rounded=""
		border=""
		class="card w-screen"
	>
		<TabAnchor href="/CSL" selected={$page.url.pathname === '/CSL'} class="card w-screen">
			<svelte:fragment slot="lead"
				><i class="fa fa-download" aria-hidden="true"></i></svelte:fragment
			>
			<span>Export</span>
		</TabAnchor>
		<!-- ... -->
	</TabGroup>
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

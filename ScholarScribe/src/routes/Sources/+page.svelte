<script lang="ts">
	import type { PageData } from './$types';
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: ({ sources } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import { redirect, type SubmitFunction } from '@sveltejs/kit';
	import { sourceList } from '../../stores/sources';
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	const submit: SubmitFunction = async ({ cancel }) => {
		if (confirm('Are you sure you want to delete this post?')) {
			return async ({ update }) => {
				return update();
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
	function populateStoreWithCheckboxes() {
		const checkboxes = document.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach((checkbox: HTMLInputElement) => {
			const id = checkbox.dataset.itemId;
			if (id) {
				sourceList.update((existingCheckedState) => {
					const newCheckedState = { ...existingCheckedState };
					newCheckedState[id] = checkbox.checked;
					return newCheckedState;
				});
			}
		});
	}

	// Function to handle "Select All" button click
	function selectAll() {
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

	onMount(() => {
		// Populate the store with all checkboxes on the page
		populateStoreWithCheckboxes();
	});
</script>

<AdminBanner />
<!-- Buttons for "Select All" and "Deselect All" -->
<div class="flex gap-4 p-10">
	<button class="btn variant-filled-primary" on:click={selectAll}>Select All</button>
	<button class="btn variant-filled-secondary" on:click={deselectAll}>Deselect All</button>
</div>
<!-- Responsive Container (recommended) -->
<div class="table-container px-10 pb-10">
	<!-- Native Table Element -->
	<table class="table table-hover">
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
				<!-- <th>Export</th> -->
			</tr>
		</thead>
		<tbody>
			{#each sources as source, i}
				<tr>
					<td
						><input
							type="checkbox"
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
							<td><!-- <div class="variant-filled-tertiary p-3">Not Owner</div> --></td>
							<td><!-- <div class="variant-filled-error p-3">Not Owner</div> --></td>
						{/if}
					</SignedIn>
					<!-- <td><button class="btn variant-filled" on:click={() => routeExport(source)}>Export</button></td> -->
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

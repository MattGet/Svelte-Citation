<script lang="ts">
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { exportJSON, exportBibTex } from '$lib/client/export.funcs';

	export let data: PageData;

	$: ({ sources } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	const popupFeatured: PopupSettings = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'bottom'
	};

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

<ListBox>
	<ListBoxItem bind:group={valueSingle} name="medium" value="JSON">JSON</ListBoxItem>
	<ListBoxItem bind:group={valueSingle} name="medium" value="BibTex">BibTex</ListBoxItem>
	<ListBoxItem bind:group={valueSingle} name="medium" value="Other">Other</ListBoxItem>
</ListBox>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Citation Type</th>
				<th>Title</th>
				<th>Author First Name</th>
				<th>Author Last Name</th>
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
					<td>{source.authorFirstName}</td>
					<td>{source.authorLastName}</td>
					<td>
						<form action="?/moreInfo&id={source.id}" method="POST">
							<button type="submit" class="btn variant-filled-error">More</button>
						</form>
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
			<a href="/" class="btn variant-filled" data-sveltekit-preload-data="hover"
				>Add New Source
			</a>
		</div>
	</SignedIn>
</div>

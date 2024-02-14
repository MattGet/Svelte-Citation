<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ sources } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
</script>

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

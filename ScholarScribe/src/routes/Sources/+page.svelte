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
				<th>Id</th>
				<th>Title</th>
				<th>Content</th>
				<th>Delete</th>
			</tr>
		</thead>
		<tbody>
			{#each sources as source, i}
				<tr>
					<td>{source.id}</td>
					<td>{source.title}</td>
					<td>{source.content}</td>
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
			<a href="/Add Source" class="btn variant-filled" data-sveltekit-preload-data="hover"
				>Add New Source
			</a>
		</div>
	</SignedIn>
</div>
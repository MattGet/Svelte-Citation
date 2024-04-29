<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	$: ({ groups } = data);

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import type { SubmitFunction } from '@sveltejs/kit'
	
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

<!-- Responsive Container (recommended) -->
<div class="table-container px-10 pb-10">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Sources</th>
				<th>Created By</th>
				<th>Primary Genre</th>
				<th>Secondary Genres</th>
				<th>Title</th>
				<SignedIn>
					<th>Delete</th>
				</SignedIn>
			</tr>
		</thead>
		<tbody>
			{#each groups as group}
				<tr>
					<td>{group.sourceids}</td>
					<td>{group.userid}</td>
					<td>{group.genDel}</td>
					<td>{group.genre.join(', ')}</td>
					<td>{group.title}</td>
					<SignedIn let:user>
						<td>
							<form action={`?/deleteGroup&id=${group.id}`} method="POST" use:enhance={submit}>
								<button type="submit" class="btn variant-filled-error">Delete</button>
							</form>
						</td>
					</SignedIn>
				</tr>
			{/each}
		</tbody>
	</table>
	<SignedIn let:user>
		<div class="flex width-full justify-center p-10">
			<a href="/Add Groups" class="btn variant-filled" data-sveltekit-preload-data="hover">Add New Group</a>
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

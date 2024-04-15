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
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Created By</th>
				<th>Primary Genre</th>
				<th>Secondary Genres</th>
				<th>Tags</th>
				<th>Title</th>
				<th>Users</th>
				<SignedIn>
					<th>Delete</th>
				</SignedIn>
			</tr>
		</thead>
		<tbody>
			{#each groups as group, i}
				<tr>
					<td>{group.userid}</td>
					<td>{group.genDel}</td>
					<td>{group.genre}</td>
					<td>{group.tags}</td>
					<td>{group.title}</td>
					<SignedIn let:user>
						{#if user?.publicMetadata.role == 'Admin' || user?.id == group.userid}
							<td>
								<a class="btn variant-filled-tertiary" href="/Update/{group.id}">Update</a>
							</td>
							<td>
								<form action="?/deleteGroup&id={group.id}" method="POST" use:enhance={submit}>
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
	<SignedIn let:user>
		<div class="flex width-full justify-center p-10">
			<a href="/Add Groups" class="btn variant-filled" data-sveltekit-preload-data="hover"
				>Add New Group
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

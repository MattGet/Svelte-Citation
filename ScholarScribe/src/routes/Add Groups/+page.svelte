<script lang="ts">
	// @ts-nocheck
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	import type { PageData } from './$types';
	import { redirect } from '@sveltejs/kit';
	let isLoading = false;
	export let data: PageData;
	$: ({ sources } = data);
</script>

<SignedIn let:user>
	<div class="card p-10 m-10">
		<form action="?/creategroup" method="POST" class="form">
			<label class="label" for="title-input">
				Title:
				<input type="text" id="title-input" name="title" class="input" />
			</label>
			<label class="label" for="genDel-input">
				Primary Genre:
				<input type="text" id="genDel-input" name="genDel" class="input" />
			</label>
			<label class="label" for="genre-input">
				Secondary Genres (comma-separated):
				<input type="text" id="genre-input" name="genre" class="input" />
			</label>
			<input type="hidden" name="userid" value={user?.id} />
			<input type="hidden" name="user" value={JSON.stringify(user)} />
			<br />
			<div class="scrollable-table">
				<table>
					<thead>
						<tr>
							<th>Select</th>
							<th>Title</th>
							<th>Author</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{#each sources as source}
							<tr>
								<td><input type="checkbox" name="selectedSources" value={source.id} /></td>
								<td>
									{source.title?.length > 30
										? `${source.title?.substring(0, 30)}...`
										: source.title}</td
								>
								<td>{source.author[0]?.given} {source.author[0]?.family}</td>
								<td><a class="btn variant-filled-secondary" href="/Source/{source.id}">View</a></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<br />
			<label class="label" for="isPublic-checkbox">
				<input type="checkbox" id="isPublic-checkbox" name="isPublic" class="form-checkbox" />
				Is the Group public?
			</label>
			<button type="submit" class="btn variant-filled-primary" on:click={redirect(303, '/Groups')}>
				{#if isLoading}
					<span>Loading...</span>
				{:else}
					<span>Create Group</span>
				{/if}
			</button>
		</form>
	</div>
</SignedIn>

<style>
	.scrollable-table {
		max-height: 300px; /* Adjust height as needed */
		overflow: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}

	th,
	td {
		padding: 8px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}
</style>

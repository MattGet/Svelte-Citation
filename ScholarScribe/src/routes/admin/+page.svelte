<script lang="ts">
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import type { PageData } from './$types';
	import UserTable from '$lib/components/UserTable/UserTable.svelte';
	import AdminBanner from '$lib/components/AdminBanner.svelte';
	import { Tab, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	let tabSet: number = 0;
	const authorizedExtensions = ['.csl'];

	export let data: PageData;
	$: ({ users } = data);
	$: ({ templates } = data);

	function test() {
		console.log(templates);
		console.log(templates?.data);
	}

	const submit: SubmitFunction = async ({ cancel }) => {
		if (confirm('Are you sure you want to delete this citation style?')) {
			return async ({ update }) => {
				return update();
			};
		} else {
			cancel();
		}
	};
</script>

<AdminBanner />
<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>Edit Users</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Citation Styles</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div>
				<ClerkLoaded let:clerk>
					{#if clerk?.user?.organizationMemberships[0]?.organization.name == 'Scholar Scribe' || clerk?.user?.publicMetadata.role == 'Admin'}
						<UserTable {users} />
					{:else}
						<p>Not Authorized</p>
					{/if}
				</ClerkLoaded>
			</div>
		{:else if tabSet === 1}
			<div class="flex justify-center">
				<div class="flex flex-col gap-4 p-10">
					<h3 class="h3">Add a new citation style</h3>
					<form action="?/addCiteStyle" method="post" use:enhance enctype="multipart/form-data">
						<div class="flex flex-col gap-4">
							<label for="file">Upload your file</label>
							<input
								type="file"
								id="file"
								name="fileToUpload"
								accept={authorizedExtensions.join(',')}
								required
							/>
						</div>
						<br />
						<button class="btn variant-filled-primary" type="submit">Submit</button>
					</form>
				</div>
				<div>
					<!-- Responsive Container (recommended) -->
					<div class="table-container px-10">
						<!-- Native Table Element -->
						<table class="table table-hover">
							<thead>
								<tr>
									<th>Citation Style</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{#each Object.entries(templates?.data) as template, i}
									<tr>
										<td>{template[0]}</td>
										<td>
											<form
												action="?/removeCiteStyle&name={template[0]}"
												method="POST"
												use:enhance={submit}
											>
												<button type="submit" class="btn variant-filled-error">Delete</button>
											</form>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
<!-- <button class="button varient-filled-primary" on:click={test}>Test</button> -->

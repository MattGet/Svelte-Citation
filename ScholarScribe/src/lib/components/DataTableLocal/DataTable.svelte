<script>
	export let users;
	import { DataHandler } from '@vincjo/datatables';

	const handler = new DataHandler(users, { rowsPerPage: 5 });
	const rows = handler.getRows();

	import Search from '$lib/components/DataTable/Search.svelte';
	import ThFilter from '$lib/components/DataTable/ThFilter.svelte';
	import ThSort from '$lib/components/DataTable/ThSort.svelte';
	import RowCount from '$lib/components/DataTable/RowCount.svelte';
	import RowsPerPage from '$lib/components/DataTable/RowsPerPage.svelte';
	import Pagination from '$lib/components/DataTable/Pagination.svelte';
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="firstName">First name</ThSort>
				<ThSort {handler} orderBy="lastName">Last name</ThSort>
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{row.firstName}</td>
					<td>{row.lastName}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>

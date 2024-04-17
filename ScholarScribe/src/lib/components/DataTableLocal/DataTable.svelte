<script>
	export let sources;
	import { DataHandler } from '@vincjo/datatables';

	const handler = new DataHandler(sources, { rowsPerPage: 5 });
	const rows = handler.getRows();

	import Search from '$lib/components/DataTableLocal/Search.svelte';
	import ThFilter from '$lib/components/DataTableLocal/ThFilter.svelte';
	import ThSort from '$lib/components/DataTableLocal/ThSort.svelte';
	import RowCount from '$lib/components/DataTableLocal/RowCount.svelte';
	import RowsPerPage from '$lib/components/DataTableLocal/RowsPerPage.svelte';
	import Pagination from '$lib/components/DataTableLocal/Pagination.svelte';
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
				<ThSort {handler} orderBy="user">Created By</ThSort>
				<ThSort {handler} orderBy="type">Source Type</ThSort>
				<ThSort {handler} orderBy="title">Title</ThSort>
				<ThSort {handler} orderBy="author">Author</ThSort>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="user" />
				<ThFilter {handler} filterBy="type" />
				<ThFilter {handler} filterBy="title" />
				<ThFilter {handler} filterBy="author" />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{JSON.parse(row.user ?? '')?.fullName}</td>
					<td>{row.type}</td>
					<td>{row.title.length > 30 ? row.title.substring(0, 30) + '...' : row.title}</td>
					<td>{row.author[0]?.given} {row.author[0]?.family}</td>
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

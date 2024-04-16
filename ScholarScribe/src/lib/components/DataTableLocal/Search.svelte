<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	let value: string;
</script>

<input
	class="input w-2/3"
	type="search"
	placeholder="Search..."
	bind:value
	on:input={() => handler.search(value)}
/>

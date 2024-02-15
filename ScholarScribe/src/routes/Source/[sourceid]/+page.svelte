<script lang="ts">
	import type { PageData } from './$types';
	import { clipboard } from '@skeletonlabs/skeleton';

	export let data: PageData;
	$: ({ source } = data);

	let copied = false;

	function onClickHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<div class="p-10">
	<h1 class="h1">
		<span
			class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
			>{source.type} Information</span
		>
	</h1>
	<div class="space-y-4 p-10">
		<h4 class="h4">Title: {source.title}</h4>
		<h4 class="h4">URL: <a href={source.URL}>{source.URL}</a></h4>
		<h4 class="h4">Author: {source.authorFirstName} {source.authorLastName}</h4>
		<h4 class="h4">Year: {source.year}</h4>
		<h4 class="h4">Publisher: {source.publisher}</h4>
	</div>
	<div class="container mx-auto p-8 space-y-8">
		<section>
			<a class="btn variant-filled-primary" href="/Sources">Back to Sources</a>
			<button
				use:clipboard={window.location.href}
				class="btn variant-filled-secondary"
				on:click={onClickHandler}
				disabled={copied}
			>
				{copied ? 'Copied 👍' : 'Copy Link'}
			</button>
		</section>
	</div>
</div>

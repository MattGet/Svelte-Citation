<script>
	// @ts-nocheck
	import Author from './Author.svelte';

	export let user = '';

	let maxAuthors = 10;

	export let numAuthors = 1;

	function addAuthorInput() {
		if (numAuthors <= maxAuthors) {
			numAuthors++;
		} else {
			alert('Maximum number of authors reached (10).');
		}
	}

	function removeAuthorInput() {
		if (numAuthors > 1) {
			numAuthors--;
		} else {
			alert('Minimum number of authors reached (1).');
		}
	}
</script>

<div>
	<form action="?/createSource" method="POST">
		<div class="space-y-8 px-20 pt-10 pb-40">
			<h3>New Book Citation</h3>
			<label class="label">
				<span>Title</span>
				<input class="input" name="title" type="text" placeholder="Title" required />
			</label>
			{#each { length: numAuthors } as _, i}
				<Author id={i} />
			{/each}
			<section class="flex flex-row gap-4">
				<button type="button" class="btn variant-filled" on:click={addAuthorInput}
					>Add Author</button
				>
				<button type="button" class="btn variant-filled" on:click={removeAuthorInput}
					>Remove Author</button
				>
			</section>
			<label class="label">
				<span>Year</span>
				<input class="input" name="year" type="text" placeholder="Year" />
			</label>
			<label class="label">
				<span>Publisher</span>
				<input class="input" name="publisher" type="text" placeholder="Publisher" />
			</label>
			<input class="input" type="hidden" name="type" value="book" />
			<input class="input" type="hidden" name="numAuthors" value={numAuthors} />
			<input class="input" type="hidden" name="userid" value={user} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

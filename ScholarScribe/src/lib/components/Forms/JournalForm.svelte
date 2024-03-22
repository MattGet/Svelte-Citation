<script>
	// @ts-nocheck
	import Author from './Author.svelte';
	import { Months } from '$lib/client/helper.funcs';

	export let user;

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
			<h3>New Journal Article Citation</h3>
			<label class="label">
				<span>Article Title</span>
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
				<span>Journal Title</span>
				<input class="input" name="volume_title" type="text" placeholder="Journal Title" required />
			</label>
			<label class="label">
				<span>Volume</span>
				<input class="input" name="volume" type="text" placeholder="Volume" required />
			</label>
			<label class="label">
				<span>Issue</span>
				<input class="input" name="issue" type="text" placeholder="Issue" required />
			</label>
			<label class="label">
				<span>Page</span>
				<input class="input" name="page" type="text" placeholder="Page" required />
			</label>
			<label class="label">
				<span>Date</span>
				<section class="flex flex-row gap-4">
					<input class="input basis-1/5" name="day" type="number" placeholder="0" />
					<select class="select" name="month" value={null} placeholder="Month">
						{#each Object.values(Months) as month}
							<option value={month}>{month}</option>
						{/each}
					</select>
					<input
						class="input basis-2/5"
						name="year"
						type="number"
						placeholder="2000"
						value={null}
					/>
				</section>
			</label>
			<input class="input" type="hidden" name="type" value="article-journal" />
			<input class="input" type="hidden" name="numAuthors" value={numAuthors} />
			<input class="input" type="hidden" name="userid" value={user?.id} />
			<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

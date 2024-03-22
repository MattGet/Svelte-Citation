<script lang="ts">
	//@ts-nocheck
	import '../../../app.postcss';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ source } = data);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	import Author from '$lib/components/Forms/Author.svelte';
	import { Months } from '$lib/client/helper.funcs';

	let maxAuthors = 10;

	const numAuthors = data.source.author.length;

	export let NUMB = numAuthors;

	function addAuthorInput() {
		if (NUMB <= maxAuthors) {
			NUMB++;
		} else {
			alert('Maximum number of authors reached (10).');
		}
	}

	function removeAuthorInput() {
		if (NUMB > 1) {
			NUMB--;
		} else {
			alert('Minimum number of authors reached (1).');
		}
	}
</script>

<SignedIn let:user>
	<div class="flex-col justify-center">
		<form action="?/updateSource" method="POST">
			<div class="space-y-8 px-20 pt-10 pb-10">
				<h1 class="h1">Confirm {source.type} import</h1>
				<label class="label">
					<span>Title</span>
					<input
						class="input"
						name="title"
						type="text"
						placeholder="Title"
						value={source.title}
						required
					/>
				</label>
				{#each { length: NUMB } as _, i}
					<Author
						id={i}
						fv={source.author[i]?.given}
						lv={source.author[i]?.family}
						jv={source.author[i]?.suffix}
					/>
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
					<span>Date</span>
					<section class="flex flex-row gap-4">
						<input
							class="input basis-1/5"
							name="day"
							type="number"
							placeholder="0"
							value={source.date.day}
						/>
						<select class="select" name="month" value={source.date.month}>
							{#each Object.values(Months) as month}
								<option value={month}>{month}</option>
							{/each}
						</select>
						<input
							class="input basis-2/5"
							name="year"
							type="number"
							placeholder="2000"
							value={source.date.year}
						/>
					</section>
				</label>
				<section class="flex flex-row gap-4">
					<label class="label basis-2/5">
						<span>Volume Title</span>
						<input
							class="input"
							name="volume_title"
							type="text"
							placeholder="volume"
							value={source.volume_title}
						/>
					</label>
					<label class="label basis-1/5">
						<span>Issue</span>
						<input class="input" name="issue" type="number" placeholder="0" value={source.issue} />
					</label>
					<label class="label basis-1/5">
						<span>Volume Number</span>
						<input
							class="input"
							name="volume"
							type="number"
							placeholder="0"
							value={source.volume}
						/>
					</label>
					<label class="label basis-1/5">
						<span>Pages</span>
						<input class="input" name="page" type="text" placeholder="1-10" value={source.page} />
					</label>
				</section>
				<label class="label">
					<span>URL</span>
					<input class="input" name="URL" type="text" placeholder="URL" value={source.URL} />
				</label>
				<label class="label">
					<span>Publisher</span>
					<input
						class="input"
						name="publisher"
						type="text"
						placeholder="Publisher"
						value={source.publisher}
					/>
				</label>
				<label>
					<span>Type</span>
					<select class="select" size="1" name="type" value={source.type}>
						<option value="webpage">Website</option>
						<option value="article-journal">Journal</option>
						<option value="book">Book</option>
					</select>
				</label>
				<input class="input" type="hidden" name="numAuthors" value={NUMB} />
				<input class="input" type="hidden" name="userid" value={user?.id} />
				<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
				<input class="input" type="hidden" name="id" value={source.id} />
				<section class="flex flex-row gap-4">
					<button type="submit" class="btn variant-filled-success">Submit</button>
					<form action="?/deleteSource&id={source.id}" method="POST">
						<button type="submit" class="btn variant-filled-error">Cancel Import</button>
					</form>
				</section>
			</div>
		</form>
	</div>
</SignedIn>

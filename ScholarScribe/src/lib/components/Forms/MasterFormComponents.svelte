<script lang="ts">
	//@ts-nocheck
	export let source;
	export let user;
	export let NUMB = 1;
	export let tags;

	import Author from '$lib/components/Forms/Author.svelte';
	import { Months } from '$lib/client/helper.funcs';
	import Tags from './Tags.svelte';

	let maxAuthors = 10;

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

<label>
	<span>Type</span>
	<select class="select" size="1" name="type" value={source?.type}>
		<option value="webpage">Website</option>
		<option value="article-journal">Journal</option>
		<option value="book">Book</option>
		<option value="patent">Patent</option>
		<option value="article-magazine">Editorial</option>
		<option value="paper-conference">Conference</option>
	</select>
</label>
<label class="label">
	<span>Title</span>
	<input
		class="input"
		name="title"
		type="text"
		placeholder="Title"
		value={source?.title ?? ''}
		required
	/>
</label>
{#each { length: NUMB } as _, i}
	<Author
		id={i}
		fv={source?.author[i]?.given}
		lv={source?.author[i]?.family}
		jv={source?.author[i]?.suffix}
	/>
{/each}
<section class="flex flex-row gap-4">
	<button type="button" class="btn variant-filled" on:click={addAuthorInput}>Add Author</button>
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
			value={source?.date.day}
		/>
		<select class="select" name="month" value={source?.date.month}>
			{#each Object.values(Months) as month}
				<option value={month}>{month}</option>
			{/each}
		</select>
		<input
			class="input basis-2/5"
			name="year"
			type="number"
			placeholder="2000"
			value={source?.date.year}
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
			value={source?.volume_title ?? ''}
		/>
	</label>
	<label class="label basis-1/5">
		<span>Issue</span>
		<input class="input" name="issue" type="number" placeholder="0" value={source?.issue ?? ''} />
	</label>
	<label class="label basis-1/5">
		<span>Volume Number</span>
		<input class="input" name="volume" type="number" placeholder="0" value={source?.volume ?? ''} />
	</label>
	<label class="label basis-1/5">
		<span>Pages</span>
		<input class="input" name="page" type="text" placeholder="1-10" value={source?.page ?? ''} />
	</label>
</section>
<label class="label">
	<span>URL</span>
	<input class="input" name="URL" type="text" placeholder="URL" value={source?.URL ?? ''} />
</label>
<label class="label">
	<span>Publisher</span>
	<input
		class="input"
		name="publisher"
		type="text"
		placeholder="Publisher"
		value={source?.publisher ?? ''}
	/>
</label>
<Tags {tags} inputChipList={source.tags?.split(',') ?? []} />
<input class="input" type="hidden" name="numAuthors" value={NUMB} />
<input class="input" type="hidden" name="userid" value={user?.id} />
<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
<input class="input" type="hidden" name="creator" value={user?.fullName ?? ''} />
<input class="input" type="hidden" name="time" value={Date.now().toString()} />
<input class="input" type="hidden" name="id" value={source?.id} />

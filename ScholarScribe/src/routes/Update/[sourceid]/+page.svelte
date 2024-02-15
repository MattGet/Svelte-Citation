<script lang="ts">
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
</script>

<SignedIn let:user>
	<div>
		<form action="?/updateSource" method="POST">
			<div class="space-y-8 px-20 pt-10 pb-40">
				<h3>Update {source.type} Citation</h3>
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
				<label class="label">
					<span>Authors First Name</span>
					<input
						class="input"
						name="authorFirstName"
						type="text"
						placeholder="Authors First Name"
						value={source.authorFirstName}
					/>
				</label>
				<label class="label">
					<span>Authors Last Name</span>
					<input
						class="input"
						name="authorLastName"
						type="text"
						placeholder="Authors Last Name"
						value={source.authorLastName}
					/>
				</label>
				<label class="label">
					<span>Year</span>
					<input class="input" name="year" type="text" placeholder="Year" value={source.year} />
				</label>
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
						<option value="Webpage">Website</option>
						<option value="Journal">Journal</option>
						<option value="Book">Book</option>
					</select>
				</label>
				<input class="input" type="hidden" name="userid" value={user?.id} />
				<input class="input" type="hidden" name="id" value={source.id} />
				<button type="submit" class="btn variant-filled">Submit</button>
			</div>
		</form>
	</div>
</SignedIn>

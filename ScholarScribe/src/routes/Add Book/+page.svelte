<script lang="ts">
	import '../../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
</script>

<SignedIn let:user>
	<div>
		<form action="?/createSource" method="POST">
			<div class="space-y-8 p-20">
				<h3>New Source</h3>
				<label class="label">
					<span>Title</span>
					<input class="input" name="title" type="text" placeholder="Title" />
				</label>
				<label class="label">
					<span>Authors First Name</span>
					<input class="input" name="authorFirstName" type="text" placeholder="Authors First Name" />
				</label>
				<label class="label">
					<span>Authors Last Name</span>
					<input class="input" name="authorLastName" type="text" placeholder="Authors Last Name" />
				</label>
				<label class="label">
					<span>Year</span>
					<input class="input" name="year" type="text" placeholder="Year" />
				</label>
				<label class="label">
					<span>Publisher</span>
					<input class="input" name="publisher" type="text" placeholder="Publisher" />
				</label>
				<label class="label">
					<span>URL</span>
					<input class="input" name="URL" type="text" placeholder="URL" />
				</label>
				<input class="input" type="hidden" name="userid" value={user?.id} />
				<button type="submit" class="btn variant-filled">Submit</button>
			</div>
		</form>
	</div>
</SignedIn>

<SignedOut></SignedOut>

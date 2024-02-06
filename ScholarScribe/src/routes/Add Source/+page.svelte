<script lang="ts">
	import '../../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div>
	<form action="?/createSource" method="POST">
		<div class="space-y-8 p-20">
			<h3>New Source</h3>
			<label class="label">
				<span>Title</span>
				<input class="input" name="title" type="text" placeholder="Title" />
			</label>
			<label class="label">
				<span>Content</span>
				<input class="input" name="content" type="text" placeholder="Content" />
			</label>
			<input class="input" type="hidden" name="userid" value={0} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

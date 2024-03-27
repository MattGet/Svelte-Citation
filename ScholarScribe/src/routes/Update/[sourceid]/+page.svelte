<script lang="ts">
	//@ts-nocheck
	import '../../../app.postcss';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ source } = data);
	const NUMB = data.source?.author.length;

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import MasterFormComponents from '$lib/components/Forms/MasterFormComponents.svelte';
</script>

<SignedIn let:user>
	<div>
		<form action="?/updateSource" method="POST">
			<div class="space-y-8 px-20 pt-10 pb-40">
				<h3>Update {source.type} citation</h3>
				<MasterFormComponents {source} {user} {NUMB} />
				<button type="submit" class="btn variant-filled">Submit</button>
			</div>
		</form>
	</div>
</SignedIn>

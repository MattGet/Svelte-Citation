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
	<div class="flex-col justify-center">
		<form action="?/updateSource" method="POST">
			<div class="space-y-8 px-20 pt-10 pb-10">
				<h1 class="h1">Confirm {source.type} import</h1>
				<MasterFormComponents {source} {user} {NUMB} />
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

<script lang="ts">
	//@ts-nocheck
	import '../../app.postcss';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ sources } = data);
	const NUMB = data.source?.author.length;

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, Stepper, Step } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import MasterFormComponents from '$lib/components/Forms/MasterFormComponents.svelte';
	import { enhance } from '$app/forms';
	function complete() {
		window.location.href = '/Sources';
	}

	const submit: SubmitFunction = async ({ formData }) => {
		return async ({ update }) => {
			return update({ reset: false, invalidateAll: false });
		};
	};
</script>

<SignedIn let:user>
	<div class="card p-5 m-10">
		<Stepper on:complete={complete}>
			{#each sources as source}
				<Step>
					<svelte:fragment slot="header"
						><h1 class="h1">Confirm {source.type} import</h1></svelte:fragment
					>
					<div class="card overflow-y-auto" style="height: 400px;">
						<div class="flex-col justify-center">
							<form action="?/updateSource" method="POST" use:enhance={submit}>
								<div class="space-y-8 px-20 pt-10 pb-10">
									<MasterFormComponents {source} {user} {NUMB} />
									<section class="flex flex-row gap-4">
										<button type="submit" class="btn variant-filled-success">Update</button>
										<form action="?/deleteSource&id={source.id}" method="POST">
											<button type="submit" class="btn variant-filled-error">Cancel Import</button>
										</form>
									</section>
								</div>
							</form>
						</div>
					</div>
				</Step>
			{/each}
		</Stepper>
		{#if sources.length < 2}
			<br />
			<a class="btn variant-filled-primary" href="/Sources">Complete</a>
		{/if}
	</div>
</SignedIn>

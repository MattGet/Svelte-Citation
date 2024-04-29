<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import Tags from './Tags.svelte';
	import { importType } from '../../../stores/sources';
	// @ts-nocheck
	export let user: any;
	export let tags: any;
	// Function to handle changes in selection
	function handleChange(event: any) {
		// console.log(event.target.value);
		importType.set(event.target.value);
	}
</script>

<div>
	<form action="?/importSource" method="POST">
		<div class="space-y-8 px-20 pt-10 pb-40">
			<h3>Import New Citation</h3>
			<label class="label">
				<span>Import by:</span>
				<section class="flex flex-col gap-4">
					<select
						class="select"
						name="importType"
						bind:value={$importType}
						on:change={handleChange}
					>
						<option value="json">JSON</option>
						<option value="bibtex">BibTex</option>
						<option value="doi">DOI</option>
						<option value="isbn">ISBN</option>
						<option value="npm">NPM</option>
					</select>
					{#if $importType == 'bibtex' || $importType == 'json'}
						<textarea cols="100" rows="10" name="importText"></textarea>
					{:else}
						<input class="input" name="importText" type="text" placeholder="Import Text" required />
					{/if}
				</section>
			</label>
			<Tags {tags} />
			<input class="input" type="hidden" name="userid" value={user?.id} />
			<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
			<input class="input" type="hidden" name="creator" value={user?.fullName ?? ''} />
			<input class="input" type="hidden" name="time" value={Date.now().toString()} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

<style>
	textarea {
		color: white;
		background-color: #21262b;
		border: 10px;
		min-width: 200px;
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 18px;
	}
</style>

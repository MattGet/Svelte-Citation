<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import Tags from './Tags.svelte';
	// @ts-ignore
	export let user: any;
	export let tags: any[];

	const authorizedExtensions = ['.bib', '.json', '.txt'];

	let type = 'file';
	let files: FileList;

	function onChangeHandler(e: Event): void {
		console.log('file data:', e);
		console.log('files:', files);
	}
</script>

<div>
	<form action="?/importFile" method="POST" enctype="multipart/form-data">
		<div class="space-y-8 px-20 pt-10 pb-40">
			<h3>Upload File</h3>
			<FileDropzone
				bind:files
				name="fileToUpload"
				on:change={onChangeHandler}
				accept={authorizedExtensions.join(',')}
				required
			>
				<svelte:fragment slot="lead"><i class="fa fa-upload" /></svelte:fragment>
				<svelte:fragment slot="message">
					{#if files?.length > 0}
						{files.item(0)?.name}
					{:else}
						Upload a file or drag and drop
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="meta">Supports CSL-JSON or BibTex</svelte:fragment>
			</FileDropzone>
			<Tags {tags} />
			<input class="input" type="hidden" name="userid" value={user?.id} />
			<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
			<input class="input" type="hidden" name="creator" value={user?.fullName ?? ''} />
			<input class="input" type="hidden" name="time" value={Date.now().toString()} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

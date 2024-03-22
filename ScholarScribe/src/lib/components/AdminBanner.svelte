<script>
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
</script>

<ClerkLoaded let:clerk>
	{#if clerk?.user?.publicMetadata.role == 'Admin'}
		<div class="flex justify-center" style="position: fixed; margin:auto; width:100%">
			<div class="card p-4 variant-filled-tertiary" style="width: 100%;">
				<h4 class="h4" style="text-align: center;">Admin</h4>
			</div>
		</div>
		<br />
		<br />
		<br />
	{/if}
</ClerkLoaded>

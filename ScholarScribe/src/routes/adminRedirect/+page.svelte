<script>
	import AdminBanner from '$lib/components/AdminBanner.svelte';
</script>

<AdminBanner />
<div class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Update Succesful!</h1>
	<section>
		<a class="btn variant-filled-primary" href="/admin" data-sveltekit-reload
			>Return to Admin Page</a
		>
		<a class="btn variant-filled-tertiary" href="/" rel="noreferrer noopener">Return to Home Page</a
		>
	</section>
</div>

<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { storeTheme } from '$lib/stores/stores';
</script>

<section
	class="relative flex h-full shrink-0 flex-col items-center justify-center gap-8 p-4 font-display md:gap-12"
>
	<div class="p-4">
		<section class="flex-col grow items-center justify-center p-4">
			<h1 class="h1 subpixel-antialiased text-white">Welcome to Scholar Scribe</h1>
			<br />
			<h4 class="h4 font-bold subpixel-antialiased text-white">A Web Based Citation Engine</h4>
			<br />
			<section class="flex gap-4">
				<a
					class="btn variant-filled-primary"
					href="https://github.com/users/MattGet/projects/2"
					target="_blank"
					rel="noreferrer noopener">Project</a
				>
				<a
					class="btn variant-filled-tertiary"
					href="https://github.com/MattGet/Svelte-Citation/"
					target="_blank"
					rel="noreferrer noopener">GitHub</a
				>
			</section>
		</section>
	</div>
	{#if $storeTheme == 'Valpo Radiate'}
		<img class="absolute -z-10 h-full w-full object-cover" src="/Valpo.jpg" alt="Valpo Campus" />
	{:else}
		<video
			class="absolute -z-10 h-full w-full object-cover"
			muted
			autoplay
			loop
			playsinline
			disablepictureinpicture
		>
			<source src="/Mesh.mp4" type="video/mp4" />
		</video>
	{/if}
</section>

<style lang="scss">
	h4 {
		text-align: center;
	}
	section {
		padding: 5px;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
</style>

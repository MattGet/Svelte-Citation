<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<div class="container mx-auto p-8 space-y-8">
	<h1 class="h1">Welcome to Scholar Scribe</h1>
	<p>A Web Based Citation Engine</p>
	<section>
		<a class="btn variant-filled-primary" href="https://kit.svelte.dev/">SvelteKit</a>
		<a class="btn variant-filled-secondary" href="https://tailwindcss.com/">Tailwind</a>
		<a class="btn variant-filled-tertiary" href="https://github.com/">GitHub</a>
	</section>

	<p>
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span>
			<SignOut />
		{:else}
			<span class="notSignedInText">You are not signed in</span>
		{/if}
	</p>
</div>

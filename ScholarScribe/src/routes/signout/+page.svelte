<script lang="ts">
	import { SignOut } from '@auth/sveltekit/components';
	import { page } from '$app/stores';
</script>

<div>
	<h1>SvelteKit Auth Example</h1>
	<p>
		{#if $page.data.session}
			{#if $page.data.session.user?.image}
				<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			</span>
			<form method="POST" action="/signout">
				<button class="btn variant-filled-tertiary" type="submit">Sign Out</button>
			</form>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
		{/if}
	</p>
</div>

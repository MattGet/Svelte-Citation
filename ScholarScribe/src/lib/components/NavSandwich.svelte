<script>
	import { ProgressBar, popup } from '@skeletonlabs/skeleton';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import ClerkLoading from 'clerk-sveltekit/client/ClerkLoading.svelte';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	function sOut() {
		window.location.href = '/';
	}
	import book from '$lib/assets/book.png';
</script>

<div>
	<!-- trigger -->
	<button
		class="btn variant-soft-primary"
		use:popup={{ event: 'click', target: 'Nav', closeQuery: 'a[href]' }}
	>
		<img src={book} alt="Nav" width="30" height="30" />
		<i class="fa-solid fa-caret-down" />
	</button>
	<!-- popup -->
	<div class="card p-4 w-60 shadow-xl" data-popup="Nav">
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<ClerkLoading>
					<ProgressBar value={undefined} meter="stroke-primary-500" strokeLinecap="round" />
				</ClerkLoading>
				<ClerkLoaded let:clerk>
					{#if clerk?.user?.organizationMemberships[0]?.organization.name == 'Scholar Scribe' || clerk?.user?.publicMetadata.role == 'Admin'}
						<li><a href="/admin">Admin</a></li>
					{/if}
				</ClerkLoaded>
				<SignedOut>
					<li><a href="/Login">Login</a></li>
					<li><a href="/SignUp">Sign Up</a></li>
				</SignedOut>
				<SignedIn>
					<li><a href="/User">UserProfile</a></li>
					<li><SignOutButton signOutCallback={() => sOut()} /></li>
					<li><a href="/Add Source">Add Source</a></li>
				</SignedIn>
				<li><a href="/Sources">View Sources</a></li>
			</ul>
		</nav>
	</div>
</div>

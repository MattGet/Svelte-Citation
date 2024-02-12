<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
	function sOut() {
		window.location.href = '/';
	}
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Scholar Scribe</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<SignedIn let:user>
					<p>Hello {user?.fullName}!</p>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<SignedOut>
					<li><a href="/Login">Login</a></li>
					<li><a href="/SignUp">Sign Up</a></li>
				</SignedOut>
				<SignedIn>
					<li><a href="/admin">UserProfile</a></li>
					<li><a href="/Add Journal">Add Journal</a></li>
					<li><a href="/Add Webpage">Add Webpage</a></li>
					<li><a href="/Add Book">Add Book</a></li>
					<li><a href="/Sources">View Sources</a></li>
					<li><SignOutButton signOutCallback={() => sOut()} /></li>
				</SignedIn>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
</AppShell>

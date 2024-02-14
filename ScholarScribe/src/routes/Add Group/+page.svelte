<script lang="ts">
	import '../../app.postcss';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
</script>

<SignedIn let:user>
	<div>
		<h2>Groups</h2>
		<article>
			<header>Example Gorup</header>
			<p>This is what an example entry of a group looks like :).</p>
			<button class="outline secondary">Delete Group</button>
			<a href="/" role="button" class="outline constrast" style="width: 100%; "> Edit Group </a>
		</article>
	</div>
	<div>
		<form action="?/createGroup" method="POST">
			<div class="space-y-8 p-20">
				<h3>New Group</h3>
				<label for="title"> Title</label>
				<input type="text" id="title" name="title" />
				<label for="title"> Description</label>
				<textarea id="description" name="description" rows={5} />
				<label for="title"> Sources</label>
				<input type="text" id="sources" name="sources" />
				<input class="input" type="hidden" name="userid" value={user?.id} />
				<button type="submit"> Add Group</button>
			</div>
		</form>
	</div>
</SignedIn>

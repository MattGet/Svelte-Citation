<script lang="ts">
	// @ts-nocheck
	export let user;
</script>
<div>
	<form action="?/createGroup" method="POST">
		<div class="space-y-8 px-20 pt-10 pb-40">
			<h3>New Group</h3>
			<label class="label">
				<span>Group Title</span>
				<input class="input" name="title" type="text" placeholder="Title" required />
			</label>
			<label class="label">
				<span>Volume</span>
				<input class="input" name="volume" type="text" placeholder="Volume" required />
			</label>
			<label class="label">
				<span>Issue</span>
				<input class="input" name="issue" type="text" placeholder="Issue" required />
            </label>
			<label class="label">
				<span>Page</span>
				<input class="input" name="page" type="text" placeholder="Page" required />
			</label>
			
			<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

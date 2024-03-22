<script>
export let user = '';
</script><div>
	<form action="?/createGroup" method="POST">
		<div class="space-y-8 px-20 pt-10 pb-40">
			<h3>New Group</h3>
			<label class="label">
				<span>Group Name</span>
				<input class="input" name="title" type="text" placeholder="Group Name" required />
			</label>
            <label class="label">
				<span>Group Creator Name</span>
				<input class="input" name="userid" type="text" placeholder="Name" required />
			<label class="label">
				<span>General Delegation</span>
				<input class="input" name="genDel" type="text" placeholder="General Delegation" required />
			</label>
			<label class="label">
				<span>Is this Public?</span>
				<input class="input" name="issue" type="checkbox" required />
			</label>
			</label>
            <label class="label">
				<span>Type</span>
				<input class="input" name="page" type="text" placeholder="Academic" required />
			</label>
			<input class="input" type="hidden" name="type" value="article-magazine" />
			<input class="input" type="hidden" name="userid" value={user} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>
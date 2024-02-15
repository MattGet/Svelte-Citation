<script>
	export let user = '';
</script>

<div>
	<form action="?/createSource" method="POST">
		<div class="space-y-8 px-20 py-10 pb-40">
			<h3>New Website Citation</h3>
			<label class="label">
				<span>Title</span>
				<input class="input" name="title" type="text" placeholder="Title" required />
			</label>
			<label class="label">
				<span>Authors First Name</span>
				<input class="input" name="authorFirstName" type="text" placeholder="Authors First Name" />
			</label>
			<label class="label">
				<span>Authors Last Name</span>
				<input class="input" name="authorLastName" type="text" placeholder="Authors Last Name" />
			</label>
			<label class="label">
				<span>Year Accessed</span>
				<input class="input" name="year" type="text" placeholder="Year Accessed" />
			</label>
			<label class="label">
				<span>URL</span>
				<input class="input" name="URL" type="text" placeholder="URL" required />
			</label>
			<input class="input" type="hidden" name="type" value="Webpage" />
			<input class="input" type="hidden" name="userid" value={user?.id} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

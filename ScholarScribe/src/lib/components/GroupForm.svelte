<script lang="ts">
    import createGroup from '$lib/components/GroupForm.svelte';

	export let user: string = '';

async function handleSubmit(event: Event) {
	event.preventDefault();

	const formData = new FormData(event.target as HTMLFormElement);
	const title = formData.get('title') as string;
	const userid = formData.get('userid') as string;
	const genDel = formData.get('genDel') as string;
	const isPublic = formData.get('issue') === 'on';

	try {
		const createdGroup = await prisma.group.create({
			data: {
				title,
				userid,
				genDel,
				isPublic,
				type: 'webpage',
			},
		});

		// Redirect to the Groups page upon successful creation
		window.location.href = '/Groups';
	} catch (error) {
		console.error('Error creating group:', error);
		// Handle error responses
	}
}
</script>

<div>
<form on:submit={handleSubmit}>
	<div class="space-y-8 px-20 pt-10 pb-40">
		<h3>New Group</h3>
		<label class="label">
			<span>Group Name</span>
			<input class="input" name="title" type="text" placeholder="Group Name" required />
		</label>
		<label class="label">
			<span>Group Creator Name</span>
			<input class="input" name="userid" type="text" placeholder="Name" required />
		</label>
		<label class="label">
			<span>General Delegation</span>
			<input class="input" name="genDel" type="text" placeholder="General Delegation" required />
		</label>
		<label class="label">
			<span>Is this Public?</span>
			<input class="input" name="issue" type="checkbox" required />
		</label>
		<label class="label">
			<span>Type</span>
			<input class="input" name="page" type="text" placeholder="Academic" required />
		</label>
		<input type="hidden" name="type" value="article-magazine" />
		<input type="hidden" name="userid" value={user} />
		<button type="submit" class="btn variant-filled">Submit</button>
	</div>
</form>
</div>
<script>
	/**
	 * @type {any}
	 */
	export let users;
</script>

<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4"></header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<th>First Name</th>
		<th>Last Name</th>
		<th>Email</th>
		<th>Last Active</th>
		<th>Role</th>
		<th>Update</th>
		<tbody>
			{#each users as user}
				<tr>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.emailAddresses[0].emailAddress}</td>
					<td>{new Date(user.lastSignInAt).toLocaleString()}</td>
					<td>
						<!-- {console.log(user.publicMetadata)} -->
						{#if user.publicMetadata.role == 'Admin'}
							<p>Admin</p>
						{:else if user.publicMetadata.role == 'User'}
							<p>User</p>
						{:else}
							<p>No Role</p>
						{/if}
					</td>
					<td>
						<form action="?/updateRole&id={user.id}" method="POST">
							<div class="flex x-2">
								<select class="select" name="role" value={user.publicMetadata.role}>
									<option value="User">User</option>
									<option value="Admin">Admin</option>
								</select>
								<button type="submit" class="btn variant-filled-error">Update</button>
							</div>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between"></footer>
</div>

<style lang="scss">
	td {
		padding: 5px;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
	th {
		padding: 5px;
		justify-content: center;
		text-align: center;
		align-items: center;
	}
</style>

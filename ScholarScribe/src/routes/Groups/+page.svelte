   
  <script lang="ts">
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
    import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
  
    let groups: any; // Initialize groups as an empty array

    // Fetch groups data when the component is instantiated
    fetch('/api/groups')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Update the groups variable with the fetched data
    groups = data;
  })
  .catch(error => {
    console.error('Error fetching groups:', error);
    // Handle error appropriately
  });
    </script>
 
<div class="table-container px-10 pb-10">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Title</th>
				<th>Creator</th>
				<th>General Delegation</th>
				<th>Is it Public?</th>
				
			</tr>
		</thead>
		<tbody>
			{#each groups as group}
				<tr>
					<td>{group.title}</td>
					<td>{group.userid}</td>
					<td>{group.genDel}</td>
                    <td>{group.isPublic}</td>
					<td>
				
				</tr>
			{/each}
		</tbody>
	</table>
	<SignedIn let:user>
		<div class="flex width-full justify-center p-10">
			<a href="/Add Source" class="btn variant-filled" data-sveltekit-preload-data="hover"
				>Add New Source
			</a>
		</div>
	</SignedIn>
</div>
<script lang="ts">
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
    import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	  import createGroup from '$lib/components/GroupForm.svelte';
	let group = {
        title: '',
        userid: '',
        genDel: '',
        isPublic: false
    };
	
	async function handleSubmit(event:any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Perform form submission logic, e.g., sending form data to the server
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        // Handle successful form submission, e.g., redirect to another page
        console.log('Form submitted successfully');
      } else {
        // Handle form submission error
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  
</script>
<style>
	form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 8px;
    }
    label {
        display: block;
        margin-bottom: 10px;
    }
    input[type="text"],
    input[type="checkbox"] {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
        box-sizing: border-box;
    }
    input[type="checkbox"] {
        width: auto;
    }
	button{
		border-radius: 10px;
	}
	
	
</style>
<SignedIn>
<form class="variant-filled-primary" on:submit|preventDefault={createGroup}>
	<label>
        Title:
        <input type="text" name="title" bind:value={group.title}>
    </label>
    <label>
        User ID:
        <input type="text" name="userid" bind:value={group.userid}>
    </label>
    <label>
        Use:
        <input type="text" name="genDel" bind:value={group.genDel}>
    </label>
    <label>
        Is the Group public?:
        <input type="checkbox" name="isPublic" bind:checked={group.isPublic}>
    </label>
    <button type="button" class="btn btn-lg variant-filled-tertiary" >Create Group</button>
</form>
</SignedIn>
<SignedOut></SignedOut>
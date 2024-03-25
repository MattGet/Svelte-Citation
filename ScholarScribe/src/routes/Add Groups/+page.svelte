<script lang="ts">
  import { navigate } from 'svelte-routing'; // Import navigate for redirect

  let isLoading = false;
  let errorMessage = '';
  let successMessage = '';

  // Function to create a new group

  async function createGroup(event: Event) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const title = formData.get('title') as string;
  const userid = formData.get('userid') as string;
  const genDel = formData.get('genDel') as string;
  const genre = (formData.get('genre') as string).split(',').map(genre => genre.trim());
  const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim());
  const isPublic = formData.get('isPublic') === 'on';

  try {
    const response = await fetch('src/routes/Add Groups/_page.server.ts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, userid, genDel, genre, tags, isPublic }),
    });

    if (response.ok) {
      console.log('New group created successfully');
      // Handle success
    } else {
      console.error('Error creating group:', response.statusText);
      // Handle error
    }
  } catch (error) {
    console.error('Error creating group:', error);
    // Handle error
  }
}

</script>


{#if errorMessage}
  <div class="error-message">{errorMessage}</div>
{/if}

{#if successMessage}
  <div class="success-message">{successMessage}</div>
{/if}

<form class="variant-filled-primary" on:submit={createGroup}>
  <label>
    Title:
    <input type="text" name="title">
  </label>
  <label>
    User ID:
    <input type="text" name="userid">
  </label>
  <label>
    General Delegation:
    <input type="text" name="genDel">
  </label>
  <label>
    Genre (comma-separated):
    <input type="text" name="genre">
  </label>
  <label>
    Tags (comma-separated):
    <input type="text" name="tags">
  </label>
  <label>
    Is the Group public?:
    <input type="checkbox" name="isPublic">
  </label>
  <button type="submit" class="btn btn-lg variant-filled-tertiary" disabled={isLoading}>
    {#if isLoading}
      <span>Loading...</span>
    {:else}
      <span>Create Group</span>
    {/if}
  </button>
</form>

<style>
  .error-message, .success-message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 4px;
  }

  .error-message {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
  }

  .success-message {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
  }
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
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  input[type="checkbox"] {
    width: auto;
  }

  button[type="submit"] {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    border: none;
    cursor: pointer;
  }
</style>

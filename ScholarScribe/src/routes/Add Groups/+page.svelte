<script lang="ts">
  import { navigate } from 'svelte-routing'; // Import navigate for redirect
  import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
  import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
  import { InputChip } from '@skeletonlabs/skeleton';
  let isLoading = false;
  let tags: string[] = [];
  // Function to create a new group
</script>




<form action="?/creategroup" method="POST" class="variant-filled-primary">
  <label>
    Title:
    <input type="text" name="title">
  </label>
  <label>
    User ID:
    <input type="text" name="userid">
  </label>
  <label>
    Primary Genre:
    <input type="text" name="genDel">
  </label>
  <label>
    Secondary Genres (comma-separated):
    <input type="text" name="genre">
  </label>
  <InputChip bind:value={tags} name="tags" placeholder="Enter tags here..." />
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

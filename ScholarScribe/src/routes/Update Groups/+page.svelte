<script lang="ts">
    import { navigate } from 'svelte-routing'; // Import navigate for redirect
    import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
    import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
    import { InputChip } from '@skeletonlabs/skeleton';
    import { Autocomplete } from '@skeletonlabs/skeleton';
    import type { AutocompleteOption } from '@skeletonlabs/skeleton';
    
    import type { PageData } from './$types';
    import { redirect } from '@sveltejs/kit';
    let isLoading = false;
    export let data: PageData;
    $: ({ group } = data);
    $:({ sources } = data); 
  </script>
  
  <SignedIn let:user>
    <form action="?/updategroup" method="POST" class="form-container">
      <label class="form-label" for="title-input">
        Title:
        <input type="text" id="title-input" name="title" class="form-input">
      </label>
      <label class="form-label" for="genDel-input">
        Primary Genre:
        <input type="text" id="genDel-input" name="genDel" class="form-input">
      </label>
      <label class="form-label" for="genre-input">
        Secondary Genres (comma-separated):
        <input type="text" id="genre-input" name="genre" class="form-input">
      </label>
      <input type="hidden" name="userid" value={user?.id} />
      <input type="hidden" name="user" value={JSON.stringify(user)} />
      <div class="scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {#each sources as source}
              <tr>
                <td><input type="checkbox" name="selectedSources" value={source.id}></td>
                <td>{source.title?.length > 30 ? `${source.title?.substring(0, 30)}...` : source.title}</td>
                <td>{source.author[0]?.given} {source.author[0]?.family}</td>
                <td><a class="btn variant-filled-secondary" href="/Source/{source.id}">View</a></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <label class="form-label" for="isPublic-checkbox">
        <input type="checkbox" id="isPublic-checkbox" name="isPublic" class="form-checkbox">
        Is the Group public?
      </label>
      <button type="submit" class="form-submit" on:click={redirect(303,"/Groups")}>
        {#if isLoading}
          <span>Loading...</span>
        {:else}
          <span>Create Group</span>
        {/if}
      </button>
    </form>
    
    <style>
      .scrollable-table {
      max-height: 300px; /* Adjust height as needed */
      overflow: auto;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
  
    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  
    .form-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border-radius: 8px;
      }
    
      .form-label {
        display: block;
        margin-bottom: 10px;
      }
    
      .form-input,
      .form-checkbox {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-top: 5px;
      }
    
      .form-checkbox {
        width: auto;
      }
    
      .form-submit {
        width: 100%;
        padding: 10px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      }
    </style>
  </SignedIn>
  
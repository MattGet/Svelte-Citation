<!-- Groups.svelte -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { getGroups } from './Groups/+page.server';


    let groups: any[] = [];

    // Function to fetch groups from the server
    async function fetchGroups() {
        try {
            groups = await getGroups();
            console.log('Groups fetched:', groups);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    // Fetch groups when the component is mounted
    onMount(fetchGroups);
</script>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: left;
    }
</style>

{#if groups.length > 0}
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>User ID</th>
                <th>General Delegation</th>
                <th>Is Public</th>
            </tr>
        </thead>
        <tbody>
            {#each groups as group}
                <tr>
                    <td>{group.title}</td>
                    <td>{group.userid}</td>
                    <td>{group.genDel}</td>
                    <td>{group.isPublic ? 'Yes' : 'No'}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>No groups found.</p>
{/if}

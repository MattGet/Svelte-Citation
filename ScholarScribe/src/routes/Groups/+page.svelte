<!-- GroupList.svelte -->

<script lang="ts">
    import { PrismaClient } from '@prisma/client';
    import { onMount } from 'svelte';

    const prisma = new PrismaClient();
    let groups: any[] = [];

    // Function to fetch groups from the database
    async function fetchGroups() {
        try {
            groups = await prisma.group.findMany();
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

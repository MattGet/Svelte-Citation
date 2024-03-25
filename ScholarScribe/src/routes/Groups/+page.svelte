<!-- Table.svelte -->

<script lang="ts">
    
    let groups: any[] = [];
  
    $: {
    if (prisma) {
      (async () => {
        try {
          groups = await prisma.group.findMany();
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      })();
    }
  }
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

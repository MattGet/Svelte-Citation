<script lang="ts">
  // Import the Prisma client instance

  // Function to create a new group
  async function createGroup(event: Event) {
    event.preventDefault();
    
    // Extract form data
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const userId = formData.get('userid') as string;
    const genDel = formData.get('genDel') as string;
    const isPublic = formData.get('isPublic') === 'on';

    // Call the Prisma createGroup function
    try {
      const newGroup = await prisma.group.create({
        data: {
          title,
          userId,
          genDel,
          isPublic,
        },
      });
      console.log('New group created:', newGroup);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  }

  // Function to get a group by ID
  async function getGroupById(groupId: number) {
    try {
      const group = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });
      console.log('Group found:', group);
      return group;
    } catch (error) {
      console.error('Error fetching group:', error);
      return null;
    }
  }

  // Function to update a group
  async function updateGroup(groupId: number, data: { title?: string; userId?: string; genDel?: string; isPublic?: boolean }) {
    try {
      const updatedGroup = await prisma.group.update({
        where: {
          id: groupId,
        },
        data,
      });
      console.log('Group updated:', updatedGroup);
      return updatedGroup;
    } catch (error) {
      console.error('Error updating group:', error);
      return null;
    }
  }

  // Function to delete a group
  async function deleteGroup(groupId: number) {
    try {
      await prisma.group.delete({
        where: {
          id: groupId,
        },
      });
      console.log('Group deleted');
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  }
</script>


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
      Is the Group public?:
      <input type="checkbox" name="isPublic">
  </label>
  <button type="submit" class="btn btn-lg variant-filled-tertiary">Create Group</button>
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
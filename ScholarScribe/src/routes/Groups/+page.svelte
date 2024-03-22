<script lang="ts">
    let groups: any = []; // Initialize groups as an empty array

    async function populateDatabase(groupId:any) {
    try {
        // Retrieve the newly created group from the database
        const group = await prisma.group.findUnique({
            where: { id: groupId },
        });

        if (!group) {
            throw new Error('Group not found');
        }


        const additionalData = await prisma.additionalData.create({
            data: {
                groupId: group.id,
                // Add other fields as necessary
            },
        });

        console.log('Database populated successfully:', additionalData);
        return additionalData; // Optionally, return any relevant data
    } catch (error) {
        console.error('Error populating database:', error);
        throw error; // Propagate the error to the caller
    }
}

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
                </tr>
            {/each}
        </tbody>
    </table>
</div>
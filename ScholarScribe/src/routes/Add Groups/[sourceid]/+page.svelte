<script>
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let title = '';
	let publisher = '';
  //@ts-ignore
	async function handleSubmit(event) {
	  event.preventDefault();
  
	  try {
		const data = await prisma.source.findUnique({
		  where: {
			title: title,
		  }
		});
  
		if (data) {
		  publisher = data.publisher;
		} else {
		  console.log('Data not found');
		}
	  } catch (error) {
		console.error('Error fetching data:', error);
	  }
	}
  </script>
  <SignedIn let:user>
  <form on:submit={handleSubmit}>
	<label>
	  Title:
	  <input type="text" bind:value={title}>
	</label>
	<label>
	  Publisher:
	  <input type="text" bind:value={publisher}>
	</label>
	<button type="submit">Search</button>
  </form>
</SignedIn>
<SignedOut></SignedOut>
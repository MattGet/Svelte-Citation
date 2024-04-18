<script lang="ts">
	import { clipboard } from '@skeletonlabs/skeleton';

	let copied = false;

	export let data: any;
	export let buttonName: string;

	function onClickHandler() {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<!-- {#if window.isSecureContext} -->
<button
	use:clipboard={data}
	class="btn variant-filled-secondary"
	on:click={onClickHandler}
	disabled={copied}
>
	{copied ? 'Copied 👍' : buttonName}
</button>
<!-- {/if} -->

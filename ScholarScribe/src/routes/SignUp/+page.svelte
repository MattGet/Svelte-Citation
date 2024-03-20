<script lang="ts">
	import SignUp from 'clerk-sveltekit/client/SignUp.svelte';
</script>

<div style="display:flex; height:100%; align-items: center; justify-content: center">
	<SignUp redirectUrl="/User" />
</div>

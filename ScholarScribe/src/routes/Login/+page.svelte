<script lang="ts">
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte';
</script>

<div style="display:flex; height:100%; align-items: center; justify-content: center">
	<SignIn redirectUrl="/admin" />
</div>

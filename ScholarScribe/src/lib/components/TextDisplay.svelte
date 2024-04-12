<script>
	import { clipboard } from '@skeletonlabs/skeleton';

	export let line = '';

	// @ts-ignore
	const copyToClipboard = (e) => {
		// Brittle, but correct:
		//   <img> =(sibling)=> <code> =(last child)=> <input>
		const cmdInput = e.target.previousElementSibling.lastChild;

		// The following was derived from
		// https://gist.github.com/rproenca/64781c6a1329b48a455b645d361a9aa3

		const iOS = navigator.userAgent.match(/ipad|iphone/i);

		if (iOS) {
			const range = document.createRange();
			range.selectNodeContents(cmdInput);
			// @ts-ignore
			selection = window.getSelection();
			// @ts-ignore
			selection.removeAllRanges();
			// @ts-ignore
			selection.addRange(range);
		} else {
			cmdInput.select();
		}

		cmdInput.setSelectionRange(0, 999999);

		const success = document.execCommand('copy');

		if (success) {
			console.log('Copied this command to clipboard!', cmdInput.value);
		} else {
			console.log('Copying command to clipboard failed :-(');
		}
	};
</script>

<div>
	<div class="flex gap-10">
		<textarea cols="100" rows="10">
			{line}
		</textarea>
		<button class="btn variant-filled" style="height:70px" use:clipboard={line}
			>Copy to Clipboard</button
		>
	</div>
</div>

<style>
	textarea {
		color: white;
		background-color: #21262b;
		border: 10px;
		min-width: 200px;
		font-family: 'IBM Plex Mono';
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 18px;
	}
</style>

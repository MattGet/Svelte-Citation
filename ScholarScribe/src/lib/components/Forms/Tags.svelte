<script lang="ts">
	import {
		Autocomplete,
		InputChip,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	export let tags: any[] = [];

	// Local
	let inputPopupDemo = '';
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	let inputDemo = '';
	let inputAllowlist = '';
	type TagsOption = AutocompleteOption<string>;

	var tagObjects = tags.map(function (tag: any) {
		// Capitalize the first letter of each tag
		var capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

		// Create an object with label and value fields
		return {
			label: capitalizedTag,
			value: tag
		};
	});
	const flavorOptions: TagsOption[] = tagObjects;

	// Input Chip
	let inputChip = '';
	export let inputChipList: any[] = [];

	function onInputChipSelect(event: CustomEvent<TagsOption>): void {
		console.log('onInputChipSelect', event.detail);
		if (inputChipList.includes(event.detail.value) === false) {
			inputChipList = [...inputChipList, event.detail.value];
			inputChip = '';
		}
		console.log(`Input = ${inputChipList}`);
	}
</script>

<div class="text-token w-full max-w-sm space-y-2">
	<section>Enter Tags:</section>
	<InputChip bind:input={inputChip} bind:value={inputChipList} name="tags" />
	<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
		<Autocomplete
			bind:input={inputChip}
			options={flavorOptions}
			denylist={inputChipList}
			on:selection={onInputChipSelect}
		/>
	</div>
</div>

<script>
	export let id = 1;

	export let fv = '';
	export let lv = '';
	export let jv = '';
</script>

<section class="flex flex-row gap-4">
	<label class="label">
		<span>Author {id + 1}</span>
		<section class="flex flex-row gap-4">
			<input
				class="input basis-1/3"
				name="given[{id}]"
				type="text"
				placeholder="First"
				value={fv}
			/>
			<input
				class="input basis-1/3"
				name="family[{id}]"
				type="text"
				placeholder="Last"
				value={lv}
			/>
			<input
				class="input basis-1/6"
				name="suffix[{id}]"
				type="text"
				placeholder="Suffix"
				value={jv}
			/>
		</section>
	</label>
</section>

<script>
	export let id = 1;

	export let fv = '';
	export let lv = '';
	export let vv = '';
	export let jv = '';
</script>

<section class="flex flex-row gap-4">
	<label class="label">
		<span>Author {id + 1}</span>
		<section class="flex flex-row gap-4">
			<input
				class="input basis-1/3"
				name="first[{id}]"
				type="text"
				placeholder="First"
				value={fv}
			/>
			<input class="input basis-1/3" name="last[{id}]" type="text" placeholder="Last" value={lv} />
			<input
				class="input basis-1/6"
				name="von[{id}]"
				type="text"
				placeholder="Particle"
				value={vv}
			/>
			<input class="input basis-1/6" name="jr[{id}]" type="text" placeholder="Suffix" value={jv} />
		</section>
	</label>
</section>

<script lang="ts">
	// @ts-nocheck
	export let user;
</script>

<div>
	<form action="?/importSource" method="POST">
		<div class="space-y-8 px-20 pt-10 pb-40">
			<h3>Import New Citation</h3>
			<label class="label">
				<span>Import by:</span>
				<section class="flex flex-row gap-4">
					<select class="select" name="importType" value={null}>
						<option value="doi">DOI</option>
						<option value="isbn">ISBN</option>
						<option value="bibtex">BibTex</option>
					</select>
					<input class="input" name="importText" type="text" placeholder="Import Text" required />
				</section>
			</label>
			<input class="input" type="hidden" name="userid" value={user?.id} />
			<input class="input" type="hidden" name="user" value={JSON.stringify(user)} />
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>

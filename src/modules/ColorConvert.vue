<script setup lang="ts">
import { ColorTranslator } from 'colortranslator';

const color = ref('');
const output: Ref<ColorTranslator | undefined> = ref(undefined);
function update() {
	try {
		output.value = new ColorTranslator(color.value);
	} catch {
		try {
			output.value = new ColorTranslator('#' + color.value);
		} catch {
			output.value = undefined;
		}
	}
}
watch(color, update);
</script>

<template>
	<section>
		<input v-model="color" />
		<div
			class="indicator"
			:error="output === undefined"
			:style="{
				'--color': output?.HEX,
			}"
		></div>
	</section>
	<div v-if="output instanceof ColorTranslator">
		<table>
			<tbody>
				<tr>
					<th scope="row">Hex</th>
					<td>
						<code>{{ output.HEX }}</code>
					</td>
				</tr>
				<tr>
					<th scope="row">HSL</th>
					<td>
						<code>{{ output.HSL }}</code>
					</td>
				</tr>
				<tr>
					<th scope="row">RGB</th>
					<td>
						<code>{{ output.RGB }}</code>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss">
section {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}
.indicator {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background-color: var(--color);
	border: 2px solid transparent;

	&[error='true'] {
		background-image: repeating-linear-gradient(
			45deg,
			transparent 0,
			var(--ctp-red) 3px,
			transparent 0,
			transparent 20%
		);
		border: 2px solid var(--ctp-red);
	}
}
code {
	background-color: var(--ctp-mantle);
	padding: 0.25rem;
	border-radius: 0.1rem;
}
</style>

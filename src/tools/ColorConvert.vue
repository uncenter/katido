<script setup lang="ts">
import { set, get } from '@vueuse/core';
import { ColorTranslator } from 'colortranslator';

const input = useStorage('colorconvert__color', '');
const color: Ref<ColorTranslator | undefined> = ref();

function update() {
	try {
		set(color, new ColorTranslator(get(input)));
	} catch {
		try {
			set(color, new ColorTranslator('#' + get(input)));
		} catch {
			set(color, undefined);
		}
	}
}

watch(input, update);
</script>

<template>
	<section>
		<input v-model="input" />
		<div
			class="indicator"
			:empty="color === undefined"
			:style="{
				'--color': color?.HEX,
			}"
		></div>
	</section>
	<div v-if="color instanceof ColorTranslator">
		<table>
			<tbody>
				<tr>
					<th scope="row">Hex</th>
					<td>
						<code>{{ color.HEX }}</code>
					</td>
				</tr>
				<tr>
					<th scope="row">HSL</th>
					<td>
						<code>{{ color.HSL }}</code>
					</td>
				</tr>
				<tr>
					<th scope="row">RGB</th>
					<td>
						<code>{{ color.RGB }}</code>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss">
.colorconvert {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;

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

		&[empty='true'] {
			background-image: repeating-linear-gradient(
				45deg,
				transparent 0,
				var(--ctp-overlay0) 3px,
				transparent 0,
				transparent 20%
			);
			border: 2px solid var(--ctp-overlay0);
		}
	}
	code {
		background-color: var(--ctp-mantle);
		padding: 0.25rem;
		border-radius: 0.1rem;
	}
	table {
		table-layout: fixed;
		border-collapse: collapse;
		width: 100%;

		&,
		td,
		th {
			border: 1px solid var(--ctp-surface2);
		}

		td {
			text-align: right;
			padding: 0.25rem;
		}
	}
}
</style>

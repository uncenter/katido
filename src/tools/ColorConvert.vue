<script setup lang="ts">
import { set, get } from '@vueuse/core';
import { ColorTranslator } from 'colortranslator';

const input = useStorage('colorconvert__color', '');
const color: Ref<ColorTranslator | undefined> = ref();

import { Input } from '@/components/ui/input';

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
	<section class="flex flex-row gap-2 items-center">
		<Input v-model="input" />
		<div
			class="size-10 rounded-full border-solid border-2"
			:style="{
				'background-color': color?.HEX,
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

<script setup lang="ts">
import { set, get } from '@vueuse/core';
import { TinyColor, random } from '@ctrl/tinycolor';

const input = useStorage('colorconvert__color', '');
const color: Ref<TinyColor> = ref(new TinyColor());

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-vue-next';

function update() {
	set(color, new TinyColor(get(input)));
}

watch(input, update);
</script>

<template>
	<section class="flex flex-row gap-1 items-center">
		<Input v-model="input" />
		<Button size="icon" @click="input = random().toHexString()"
			><Shuffle class="size-4"
		/></Button>
	</section>
	<div
		v-if="color.isValid"
		class="border rounded-md py-2 px-4 flex flex-row justify-between items-center"
	>
		<dl class="w-2/3 max-w-96">
			<div>
				<dt>Hex</dt>
				<dd>
					<code>{{ color.toHexString() }}</code>
				</dd>
			</div>
			<div>
				<dt>HSL</dt>
				<dd>
					<code>{{ color.toHslString() }}</code>
				</dd>
			</div>
			<div>
				<dt>RGB</dt>
				<dd>
					<code>{{ color.toRgbString() }}</code>
				</dd>
			</div>
			<div>
				<dt>CMYK</dt>
				<dd>
					<code>{{ color.toCmykString() }}</code>
				</dd>
			</div>
			<div>
				<dt>HSV</dt>
				<dd>
					<code>{{ color.toHsvString() }}</code>
				</dd>
			</div>
			<div>
				<dt>Name</dt>
				<dd>
					<code>{{ color.toName() || 'N/A' }}</code>
				</dd>
			</div>
		</dl>
		<div
			class="size-36 rounded-full border-solid border-2"
			:style="{
				'background-color': color?.toHexString(),
			}"
		></div>
	</div>
</template>

<style lang="scss">
dl div {
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	dt {
		font-weight: 500;
	}
}
</style>

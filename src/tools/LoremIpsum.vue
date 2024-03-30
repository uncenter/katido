<script setup lang="ts">
import { get, set } from '@vueuse/core';
import { loremIpsum } from 'lorem-ipsum';
import { LoremUnit } from 'lorem-ipsum/types/src/constants/units';

const unit = useStorage('loremipsum__unit', 'paragraphs') as Ref<LoremUnit>;
const count = useStorage('loremipsum__count', 2);

const output = ref('');

function update() {
	set(
		output,
		loremIpsum({
			count: get(count),
			units: get(unit),

			paragraphLowerBound: 3,
			paragraphUpperBound: 7,
			sentenceLowerBound: 5,
			sentenceUpperBound: 15,
		}),
	);
}

watch([unit, count], update);
</script>

<template>
	<section>
		<input type="number" v-model="count" />
		<select v-model="unit">
			<option value="words">words</option>
			<option value="sentences">sentences</option>
			<option value="paragraphs">paragraphs</option>
		</select>
	</section>
	<textarea v-model="output" readonly="true"></textarea>
</template>

<style lang="scss">
.loremipsum {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	section {
		display: flex;
		flex-direction: row;
		gap: 1ch;
	}

	textarea {
		width: auto;
		height: 80vh;
		font-size: 0.8rem;
	}
}
</style>

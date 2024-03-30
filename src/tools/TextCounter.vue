<script setup lang="ts">
import { get, set } from '@vueuse/core';
import { pluralize } from '../utils.ts';

const text = useStorage('textcounter__text', '');

const counts = ref({
	characters: 0,
	words: 0,
	lines: 0,
});

function count() {
	const lines = get(text).split('\n');

	set(counts, {
		characters: get(text).length,
		words: lines.filter(Boolean).reduce((acc, curr) => {
			return acc + curr.split(' ').length;
		}, 0),
		lines: get(text) === '' ? 0 : lines.length,
	});
}

watch(text, count);
</script>

<template>
	<textarea v-model="text"></textarea>
	<ul>
		<li>
			{{ counts.characters }}
			{{ pluralize('character', counts.characters) }}
		</li>
		<li>
			{{ counts.words }}
			{{ pluralize('word', counts.words) }}
		</li>
		<li>
			{{ counts.lines }}
			{{ pluralize('line', counts.lines) }}
		</li>
	</ul>
</template>

<style>
.textcounter {
	padding: 1rem;
	display: flex;
	flex-direction: column;
}
</style>

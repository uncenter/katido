<script setup lang="ts">
import { pluralize } from '../utils.ts';

const text = ref('');

const output = ref({
	characters: 0,
	words: 0,
	lines: 0,
	sentences: 0,
});

function count() {
	const lines = text.value.split('\n');
	output.value.characters = text.value.length;
	output.value.words = lines.filter(Boolean).reduce((acc, curr) => {
		return acc + curr.split(' ').length;
	}, 0);
	output.value.lines = text.value === '' ? 0 : lines.length;
}
watch(text, count);
</script>

<template>
	<textarea v-model="text"></textarea>
	<ul>
		<li>
			{{ output.characters }}
			{{ pluralize('character', output.characters) }}
		</li>
		<li>
			{{ output.words }}
			{{ pluralize('word', output.words) }}
		</li>
		<li>
			{{ output.lines }}
			{{ pluralize('line', output.lines) }}
		</li>
	</ul>
</template>

<style></style>

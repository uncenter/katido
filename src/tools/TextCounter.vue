<script setup lang="ts">
import { pluralize } from '../utils.ts';

const text = ref('');
const result = ref({
	characters: 0,
	words: 0,
	lines: 0,
	sentences: 0,
});

function count() {
	const lines = text.value.split('\n');
	result.value.characters = text.value.length;
	result.value.words = lines.filter(Boolean).reduce((acc, curr) => {
		return acc + curr.split(' ').length;
	}, 0);
	result.value.lines = text.value === '' ? 0 : lines.length;
}
watch(text, count);
</script>

<template>
	<textarea v-model="text"></textarea>
	<ul>
		<li>
			{{ result.characters }}
			{{ pluralize('character', result.characters) }}
		</li>
		<li>
			{{ result.words }}
			{{ pluralize('word', result.words) }}
		</li>
		<li>
			{{ result.lines }}
			{{ pluralize('line', result.lines) }}
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

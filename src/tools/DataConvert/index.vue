<script setup lang="ts">
import { formats, langs } from './lib';

import { getHighlighterCore } from 'shiki/core';
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs';
import catppuccinMacchiato from 'shiki/themes/catppuccin-macchiato.mjs';

const input: Ref<keyof typeof formats> = ref('json');
const output: Ref<keyof typeof formats> = ref('yaml');
const text = ref('');
const parsed: Ref<unknown> = ref();
const result: Ref<string | null> = ref('');

async function run() {
	if (text.value === '') return;
	parsed.value = formats[input.value].parse(text.value);

	const highlighter = await getHighlighterCore({
		themes: [catppuccinLatte, catppuccinMacchiato],
		langs: langs,
		loadWasm: () => import('shiki/wasm'),
	});

	if (formats[output.value].canStringify(parsed.value)) {
		result.value = highlighter.codeToHtml(
			formats[output.value].stringify(parsed.value),
			{
				lang: formats[output.value]?.lang || output.value,
				theme: 'catppuccin-macchiato',
			},
		);
	} else {
		result.value = null;
	}
}

watch(
	[text, input, output],
	(n, o) => {
		const changed = o !== n;
		if (changed) run();
	},
	{ immediate: true },
);
</script>

<template>
	<section>
		<select v-model="input">
			<option v-for="(format, key) in formats" :value="key">
				{{ format.name }}
			</option>
		</select>
		<textarea v-model="text"></textarea>
	</section>
	<section>
		<select v-model="output">
			<option
				v-for="(format, key) in formats"
				:value="key"
				:disabled="text !== '' && !format.canStringify(parsed)"
			>
				{{ format.name }}
			</option>
		</select>
		<div v-if="result !== null" v-html="result"></div>
		<div v-else aria-disabled="true"></div>
	</section>
</template>

<style lang="scss">
.dataconvert {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	select {
		width: fit-content;
		align-self: flex-end;
		background-color: var(--ctp-mantle);
		color: var(--ctp-text);
		border: 1px solid var(--ctp-surface0);
		border-radius: 0.25rem;
		padding: 0.25rem;
	}
	textarea {
		width: auto;
		height: 30vh;
		resize: none;
	}
	div {
		background-color: var(--ctp-base);
		color: var(--ctp-text);
		border: 1px solid var(--ctp-surface0);
		border-radius: 0.25rem;
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
	}
	pre {
		display: flex;
		height: 30vh;
	}
	code {
		width: 100%;
		overflow: scroll;
	}
}
</style>

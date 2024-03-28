<script setup lang="ts">
import { formats, langs } from './lib';

import { getHighlighterCore } from 'shiki/core';
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs';
import catppuccinMacchiato from 'shiki/themes/catppuccin-macchiato.mjs';

const input: Ref<keyof typeof formats> = ref('json');
const output: Ref<keyof typeof formats> = ref('yaml');

const text = ref('');
const parsed: Ref<unknown> = ref();
const stringified = ref('');
const result: Ref<string | null> = ref('');

const { copy, copied } = useClipboard({ source: text });

async function run() {
	try {
		parsed.value = formats[input.value].parse(text.value);

		const highlighter = await getHighlighterCore({
			themes: [catppuccinLatte, catppuccinMacchiato],
			langs: langs,
			loadWasm: () => import('shiki/wasm'),
		});

		if (
			text.value !== '' &&
			formats[output.value].canStringify(parsed.value)
		) {
			stringified.value = formats[output.value].stringify(parsed.value);
			result.value = highlighter.codeToHtml(stringified.value, {
				lang: formats[output.value]?.lang || output.value,
				theme: 'catppuccin-macchiato',
			});
		} else {
			result.value = null;
		}
	} catch {
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
		<div class="toolbar">
			<select v-model="input">
				<option v-for="(format, key) in formats" :value="key">
					{{ format.name }}
				</option>
			</select>
		</div>
		<textarea v-model="text"></textarea>
	</section>
	<section>
		<div class="toolbar">
			<button @click="copy(stringified)">
				<span v-if="!copied">Copy</span>
				<span v-else>Copied!</span>
			</button>
			<select v-model="output">
				<option
					v-for="(format, key) in formats"
					:value="key"
					:disabled="text !== '' && !format.canStringify(parsed)"
				>
					{{ format.name }}
				</option>
			</select>
		</div>
		<div class="output" v-if="result !== null" v-html="result"></div>
		<div class="output" v-else aria-disabled="true"></div>
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
		background-color: var(--ctp-mantle);
		color: var(--ctp-text);
		border: 1px solid var(--ctp-surface0);
		border-radius: 0.25rem;
		padding: 0.25rem;
	}

	div.toolbar {
		align-self: flex-end;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	textarea {
		width: auto;
		height: 30vh;
		resize: none;
	}

	div.output {
		background-color: var(--ctp-base);
		color: var(--ctp-text);
		border: 1px solid var(--ctp-surface0);
		border-radius: 0.25rem;
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
		display: flex;
		height: 30vh;

		&[aria-disabled='true'] {
			opacity: 0.5;
		}
	}
	pre {
		display: flex;
		width: 100%;
	}
	code {
		width: 100%;
		overflow: scroll;
	}
}
</style>

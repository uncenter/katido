<script setup lang="ts">
import { set, get } from '@vueuse/core';
import { formats, langs } from './lib';

import { getHighlighterCore } from 'shiki/core';
import catppuccinMacchiato from 'shiki/themes/catppuccin-macchiato.mjs';

const inputFormat: Ref<keyof typeof formats> = useStorage(
	'dataconvert__input-format',
	'json',
);
const outputFormat: Ref<keyof typeof formats> = useStorage(
	'dataconvert__output-format',
	'yaml',
);

const text = useStorage('dataconvert__text', '');
const parsed = ref();
const stringified = ref('');
const highlighted = ref('');

const { copy, copied } = useClipboard({ source: text });

async function run() {
	try {
		set(parsed, formats[get(inputFormat)].parse(get(text)));

		const highlighter = await getHighlighterCore({
			themes: [catppuccinMacchiato],
			langs: langs,
			loadWasm: () => import('shiki/wasm'),
		});

		if (
			text.value !== '' &&
			formats[get(outputFormat)].canStringify(get(parsed))
		) {
			set(stringified, formats[get(outputFormat)].stringify(get(parsed)));

			set(
				highlighted,
				highlighter.codeToHtml(get(stringified), {
					lang: formats[get(outputFormat)]?.lang || get(outputFormat),
					theme: 'catppuccin-macchiato',
				}),
			);
		} else {
			set(highlighted, null);
		}
	} catch {
		set(highlighted, null);
	}
}

watch(
	[text, inputFormat, outputFormat],
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
			<button
				@click="
					[inputFormat, outputFormat] = [outputFormat, inputFormat];
					text = stringified;
				"
			>
				Switch
			</button>
			<select v-model="inputFormat">
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
			<select v-model="outputFormat">
				<option
					v-for="(format, key) in formats"
					:value="key"
					:disabled="text !== '' && !format.canStringify(parsed)"
				>
					{{ format.name }}
				</option>
			</select>
		</div>
		<div
			class="output"
			v-if="highlighted !== null"
			v-html="highlighted"
		></div>
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

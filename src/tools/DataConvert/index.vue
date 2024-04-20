<script setup lang="ts">
import { set, get } from '@vueuse/core';
import { formats, langs, type Format } from './lib';

import { getHighlighterCore } from 'shiki/core';
import githubLightTheme from 'shiki/themes/github-light.mjs';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download } from 'lucide-vue-next';

const inputFormat = useStorage(
	'dataconvert__input-format',
	'json',
) as Ref<Format>;
const outputFormat = useStorage(
	'dataconvert__output-format',
	'yaml',
) as Ref<Format>;

const { open, onChange } = useFileDialog({
	accept: Object.keys(formats)
		.map((f) => '.' + f)
		.join(','),
	multiple: false,
	directory: false,
});

onChange(async (files) => {
	const file = (files as FileList)[0];
	text.value = await file.text();
	const exts = file.name.toLowerCase().split('.').reverse() as Format[];
	if (exts.length > 1 && formats[exts[0]]) {
		inputFormat.value = exts[0];
	}
	run();
});

const fs = useFileSystemAccess({
	dataType: 'Text',
});

const text = useStorage('dataconvert__text', '');
const parsed = ref();
const stringified = ref('');
const highlighted = ref('');

const { copy, copied } = useClipboard({ source: text });

async function run() {
	try {
		set(parsed, formats[get(inputFormat)].parse(get(text)));

		const highlighter = await getHighlighterCore({
			themes: [githubLightTheme],
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
					lang: get(outputFormat),
					theme: 'github-light',
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
	<section class="flex flex-col gap-2">
		<div class="flex flex-row gap-1 self-end">
			<Button @click="() => open()"
				><Upload class="size-4 mr-2" /> Upload</Button
			>
			<Button
				@click="
					() => {
						[inputFormat, outputFormat] = [
							outputFormat,
							inputFormat,
						];
						text = stringified;
					}
				"
			>
				Switch
			</Button>
			<Select v-model="inputFormat">
				<SelectTrigger class="w-[180px]">
					<SelectValue placeholder="Select an input format" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem v-for="(format, key) in formats" :value="key">
						{{ format.name }}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<Textarea v-model="text"></Textarea>
	</section>
	<section class="flex flex-col gap-2">
		<div class="flex flex-row gap-1 self-end">
			<Button
				@click="
					() => {
						fs.data.value = stringified;

						fs.saveAs({
							suggestedName: 'Untitled.' + outputFormat,
						});
					}
				"
			>
				<Download class="size-4 mr-2" /> Download
			</Button>
			<Button @click="copy(stringified)">
				<span v-if="!copied">Copy</span>
				<span v-else>Copied!</span>
			</Button>
			<Select v-model="outputFormat">
				<SelectTrigger class="w-[180px]">
					<SelectValue placeholder="Select an output format" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem
						v-for="(format, key) in formats"
						:value="key"
						:disabled="text !== '' && !format.canStringify(parsed)"
					>
						{{ format.name }}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<div
			class="border rounded-md p-2"
			v-if="highlighted !== null"
			v-html="highlighted"
		></div>
		<div class="border rounded-md" v-else aria-disabled="true"></div>
	</section>
</template>

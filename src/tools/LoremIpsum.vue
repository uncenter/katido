<script setup lang="ts">
import type { LoremUnit } from 'lorem-ipsum/types/src/constants/units';

import { get, set } from '@vueuse/core';
import { loremIpsum } from 'lorem-ipsum';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw } from 'lucide-vue-next';

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
	<section class="flex flex-row gap-2">
		<Input type="number" v-model="count" min="1" max="1000" />
		<Select v-model="unit">
			<SelectTrigger class="w-[180px]">
				<SelectValue placeholder="Select a unit" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="words">words</SelectItem>
				<SelectItem value="sentences">sentences</SelectItem>
				<SelectItem value="paragraphs">paragraphs</SelectItem>
			</SelectContent>
		</Select>
		<Button @click="update" size="icon"
			><RefreshCw class="size-4"
		/></Button>
	</section>
	<Textarea v-model="output" readonly="true"></Textarea>
</template>

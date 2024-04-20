<script setup lang="ts">
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { get } from '@vueuse/core';
import { useFuse } from '@vueuse/integrations/useFuse';

import tools from './tools';

type Tool = (typeof tools)[number]['id'];

const tool: Ref<Tool | undefined> = useStorage('tool', undefined);
const ToolComponent = computed(
	() => tools.find(({ id }) => id === get(tool))!.component,
);

const input = ref('');

const { results } = useFuse(input, tools, {
	fuseOptions: {
		keys: ['title'],
		isCaseSensitive: false,
		threshold: 0.2,
	},
	matchAllWhenSearchEmpty: true,
});

import { useMagicKeys } from '@vueuse/core';

const open = ref(false);

const keys = useMagicKeys({
	passive: false,
});

whenever(keys.cmd_k, () => {
	console.log('Cmd+K have been pressed');
	open.value = !open.value;
});
</script>

<template>
	<main class="flex flex-row gap-2 w-full">
		<aside class="rounded-md border p-2 h-full">
			<Input placeholder="Search..." v-model="input" />
			<Separator class="my-2" />
			<ul class="flex flex-col gap-1">
				<li v-for="result in results" :key="result.item.id">
					<Button
						variant="ghost"
						class="w-full justify-start"
						@click="
							tool === result.item.id
								? (tool = undefined)
								: (tool = result.item.id)
						"
						:aria-current="result.item.id === tool"
					>
						{{ result.item.title }}
					</Button>
				</li>
			</ul>
		</aside>
		<section class="rounded-md border p-2 w-full">
			<div v-if="tool !== undefined" class="flex flex-col gap-2 w-full">
				<header class="text-xl font-medium text-center">
					{{ tools.find(({ id }) => id === tool)!.title }}
				</header>
				<Separator class="mb-4" />
				<ToolComponent />
			</div>
			<div v-else class="flex justify-center items-center h-full">
				No tool selected.
			</div>
		</section>
	</main>
	<CommandDialog v-model:open="open">
		<CommandInput placeholder="Type a command or search..." />
		<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions">
				<CommandItem
					v-for="t in tools"
					:value="t.id"
					@select="
						tool = t.id;
						open = false;
					"
				>
					{{ t.title }}
				</CommandItem>
			</CommandGroup>
		</CommandList>
	</CommandDialog>
</template>

<style lang="scss">
#app {
	display: flex;
	flex-direction: row;
	padding: 1rem;
}
</style>

<script setup lang="ts">
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
</script>

<template>
	<aside class="sidebar">
		<input placeholder="Search..." v-model="input" />
		<div class="separator" />
		<ul>
			<li v-for="result in results" :key="result.item.id">
				<button
					@click="
						tool === result.item.id
							? (tool = undefined)
							: (tool = result.item.id)
					"
					:aria-current="result.item.id === tool"
				>
					{{ result.item.title }}
				</button>
			</li>
		</ul>
	</aside>
	<div class="tool">
		<div v-if="tool !== undefined">
			<header>
				<span>{{ tools.find(({ id }) => id === tool)!.title }}</span>
			</header>
			<div :class="tool">
				<ToolComponent />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
#app {
	display: flex;
	flex-direction: row;
}
.sidebar {
	width: 300px;
	height: 100vh;

	display: flex;
	flex-direction: column;

	border-right: 1px solid var(--ctp-surface1);

	input {
		margin: 1rem;
	}

	.separator {
		width: 100%;
		height: 1px;
		background-color: var(--ctp-surface1);
	}

	ul {
		list-style-type: none;
		padding: 0.5rem;

		li {
			padding-top: 0.25rem;
		}

		button {
			width: 100%;
			margin-right: 0.25rem;
			text-align: left;
			background-color: var(--ctp-base);
			border: none;

			&:hover {
				background-color: var(--ctp-mantle);
			}

			&[aria-current='true'] {
				color: var(--ctp-base);
				background-color: var(--ctp-blue);
			}
		}
	}
}
.tool {
	width: 100%;

	header {
		border-bottom: 1px solid var(--ctp-surface1);
		padding-bottom: 1rem;
		padding-top: 1rem;
		text-align: center;
		font-weight: 600;
	}
}
</style>

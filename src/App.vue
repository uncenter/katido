<script setup lang="ts">
import tools from './tools';

type Tool = keyof typeof tools;

const tool: Ref<Tool | undefined> = useStorage('tool', undefined);
const ToolComponent = computed(() => tools[tool.value as Tool].component);
</script>

<template>
	<aside class="sidebar">
		<input placeholder="Search..." />
		<div class="separator" />
		<ul>
			<li v-for="(t, key) in tools">
				<button
					@click="tool === key ? (tool = undefined) : (tool = key)"
					:aria-current="key === tool"
				>
					{{ t.title }}
				</button>
			</li>
		</ul>
	</aside>
	<div class="tool">
		<div v-if="tool !== undefined">
			<header>
				<span>{{ tools[tool].title }}</span>
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

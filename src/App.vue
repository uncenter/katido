<script setup lang="ts">
import modules from './modules';

const tool: Ref<(typeof modules)[keyof typeof modules] | undefined> =
	shallowRef(undefined);
</script>

<template>
	<aside class="sidebar">
		<input placeholder="Search..." />
		<div class="separator" />
		<ul>
			<li v-for="m in modules">
				<button @click="tool = m">
					{{ m.title }}
				</button>
			</li>
		</ul>
	</aside>
	<div class="tool">
		<div v-if="tool !== undefined">
			<header>
				<span>{{ tool.title }}</span>
			</header>
			<main><tool.component /></main>
		</div>
	</div>
</template>

<style lang="scss">
#app {
	display: flex;
	flex-direction: row;
}
.sidebar {
	width: 30vw;
	height: 100vh;

	display: flex;
	flex-direction: column;

	border-right: 2px solid var(--ctp-surface1);

	input {
		margin: 1rem;
	}

	.separator {
		width: 100%;
		height: 2px;
		background-color: var(--ctp-surface1);
	}

	ul {
		list-style-type: none;
		padding: 0.5rem;

		button {
			width: 100%;
			margin-right: 0.25rem;
			text-align: left;
			background-color: var(--ctp-base);

			&:hover {
				background-color: var(--ctp-mantle);
			}
		}
	}
}
.tool {
	width: 70vw;

	header {
		border-bottom: 2px solid var(--ctp-surface1);
		padding-bottom: 0.5rem;
		text-align: center;
	}

	main {
		padding: 1rem;
	}
}
</style>

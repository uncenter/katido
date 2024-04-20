<script setup lang="ts">
import Tools from './components/Tools.vue';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';

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
	<Tools />
	<CommandDialog v-model:open="open">
		<CommandInput placeholder="Type a command or search..." />
		<CommandList>
			<CommandEmpty>No results found.</CommandEmpty>
			<CommandGroup heading="Suggestions">
				<CommandItem value="calendar"> Calendar </CommandItem>
				<CommandItem value="search-emoji"> Search Emoji </CommandItem>
				<CommandItem value="calculator"> Calculator </CommandItem>
			</CommandGroup>
			<CommandSeparator />
			<CommandGroup heading="Settings">
				<CommandItem value="profile"> Profile </CommandItem>
				<CommandItem value="billing"> Billing </CommandItem>
				<CommandItem value="settings"> Settings </CommandItem>
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

<script lang="ts">
	import type { NetworkTables } from 'ntcore-ts-client';
	import * as Card from '$lib/components/ui/card';
	import { ntEntry } from './ntEntry.svelte.ts';
	const {
		nt,
		name,
		path
	}: {
		nt: NetworkTables;
		path: string;
		name?: string;
	} = $props();
	const ntTopic = $derived(ntEntry(nt, path, 'boolean'));
	const value = $derived(ntTopic.value);
</script>

<Card.Root class={`w-fit ${value !== null ? (value ? 'flashing-success' : 'bg-red-500') : ''}`}>
	<Card.Header>
		<Card.Title>{name}</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if value !== null}
			{#if value}
				<code class="text-mono text-bold text-lg">TRUE</code>
			{:else}
				<code class="text-mono text-bold text-lg">FALSE</code>
			{/if}
		{:else}
			<div class="text-gray-400">No value</div>
		{/if}
	</Card.Content>
</Card.Root>

<style lang="postcss">
	/* Define the flashing animation */
	@keyframes flash-bg {
		0% {
			background-color: bg-green-500;
		}
		50% {
			background-color: white;
		}
		100% {
			background-color: bg-green-500;
		}
	}

	/* Apply the animation to an element */
	:global(.flashing-success) {
		@apply bg-green-500;
		animation: flash-bg 0.2s infinite alternate; /* alternate for flashing back and forth */
	}
</style>

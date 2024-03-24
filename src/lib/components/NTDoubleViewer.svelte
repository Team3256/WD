<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	const { nt, path, name }: { nt: NetworkTables; path: string; name?: string } = $props();
	const topic = $derived(nt.createTopic<number>(path, NetworkTablesTypeInfos.kDouble));
	let value = $state<number | null>(null);
	$effect(() => {
		topic.subscribe((newValue: number | null) => {
			value = newValue;
		}, true);
	});
</script>

<Card.Root class="w-fit">
	<Card.Header>
		<Card.Title>{name ?? topic.name}</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if value !== null}
			<code class="text-mono">{value}</code>
		{:else}
			<div class="text-gray-400">No value</div>
		{/if}
	</Card.Content>
</Card.Root>

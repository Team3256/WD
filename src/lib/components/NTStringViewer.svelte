<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	const { nt, path, name }: { nt: NetworkTables; path: string; name?: string } = $props();
	const topic = $derived(nt.createTopic<boolean>(path, NetworkTablesTypeInfos.kBoolean));
	let value = $state<boolean | null>(null);
	$effect(() => {
		topic.subscribe((newValue: boolean | null) => {
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
			{#if value}
				<code class="text-mono">TRUE</code>
			{:else}
				<code class="text-mono">FALSE</code>
			{/if}
		{:else}
			<div class="text-gray-400">No value</div>
		{/if}
	</Card.Content>
</Card.Root>

<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	const { value, name }: { value: null | boolean; name: string } = $props();
</script>

<Card.Root class={`w-fit ${value !== null ? (value ? 'bg-green-500' : 'bg-red-500') : ''}`}>
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

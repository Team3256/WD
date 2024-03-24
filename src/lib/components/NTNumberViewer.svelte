<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	const { name, value }: { name: string; value: null | number } = $props();
</script>

<Card.Root class="w-fit">
	<Card.Header>
		<Card.Title>{name}</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if value !== null}
			<code class="text-mono">{value}</code>
		{:else}
			<div class="text-gray-400">No value</div>
		{/if}
	</Card.Content>
</Card.Root>

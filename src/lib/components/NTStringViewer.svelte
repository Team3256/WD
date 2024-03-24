<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	const { value, name, ...props }: { value: null | string; name: string } = $props();
</script>

<Card.Root class="w-fit" {...props}>
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

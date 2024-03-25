<script lang="ts">
	const { current, limit, name }: { name: string; current: number; limit?: number } = $props();
</script>

<p class="my-2">
	{name}:
	<span
		class={`rounded p-1 ${limit === undefined || current <= limit ? 'bg-green-500' : 'bg-red-500'}`}
		>{current} amps</span
	>
</p>

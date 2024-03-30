<script lang="ts">
	import * as Tooltip from '../ui/tooltip';
	const {
		name,
		current,
		limit,
		klass
	}: {
		current: number;
		name?: string;
		limit?: number;
		klass?: string;
		[key: string]: unknown;
	} = $props();
</script>

<div class={klass}>
	<Tooltip.Root openDelay={0}>
		<Tooltip.Trigger>
			<span
				class={`rounded-full p-1 ${limit === undefined || current <= limit ? 'bg-green-500' : 'bg-red-500'}`}
				>{current.toFixed(4)} amps</span
			>
		</Tooltip.Trigger>
		<Tooltip.Content>
			{name}
		</Tooltip.Content>
	</Tooltip.Root>
</div>

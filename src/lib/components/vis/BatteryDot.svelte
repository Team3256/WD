<script lang="ts">
	import * as Tooltip from '../ui/tooltip';
	const {
		voltage,
		klass
	}: {
		voltage: number;
		klass?: string;
		[key: string]: unknown;
	} = $props();
	const warning = 10;
	const dangerous = 3;
</script>

<div class={klass}>
	<Tooltip.Root openDelay={0}>
		<Tooltip.Trigger>
			<span
				class={`rounded-full p-1 ${voltage > warning ? 'bg-green-500' : voltage < dangerous ? 'flashing-element-bg' : 'bg-yellow-400'}`}
				>{voltage.toFixed(4)} volts</span
			>
		</Tooltip.Trigger>
		<Tooltip.Content>Battery Voltage</Tooltip.Content>
	</Tooltip.Root>
</div>

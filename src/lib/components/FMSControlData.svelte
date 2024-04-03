<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	const { nt, onChange }: { nt: NetworkTables; onChange: (state: string) => void } = $props();
	const topic = $derived(
		nt.createTopic<number>('/FMSInfo/FMSControlData', NetworkTablesTypeInfos.kInteger)
	);
	let value = $state<number | null>(null);
	$effect(() => {
		topic.subscribe((newValue: number | null) => {
			value = newValue;
		}, true);
	});
	const colorMap: Record<number, string> = {
		0: 'flashing-element-bg',
		32: 'flashing-element-bg',
		35: 'bg-blue-500',
		33: 'bg-green-500',
		37: 'bg-yellow-500'
	};
	const robotStateMap: Record<number, string> = {
		0: 'Disconnected',
		32: 'Disabled',
		35: 'Autonomous',
		33: 'Teleop',
		37: 'Test'
	};
	// TODO: Export the type of the robot state
	const robotState = $derived(value === null ? 'Unknown' : robotStateMap?.[value] ?? 'Unknown');
	$effect(() => {
		onChange(robotState);
	});
	const color = $derived(
		value === null ? 'flashing-element-bg' : colorMap?.[value] ?? 'bg-slate-500'
	);
</script>

<Card.Root class={`w-full ${color}`}>
	<Card.Header>
		<Card.Title>Robot State</Card.Title>
	</Card.Header>
	<Card.Content class="text-center text-5xl">
		{#if value !== null}
			{#if value === 0}
				<p>Disconnected</p>
			{:else if value === 32}
				<p>Disabled</p>
			{:else if value === 35}
				<p>Autonomous</p>
			{:else if value === 33}
				<p>Teleop</p>
			{:else if value === 37}
				<p>Test</p>
			{:else}
				<p>Unknown</p>
			{/if}
		{:else}
			<div>FMS DC</div>
		{/if}
	</Card.Content>
</Card.Root>

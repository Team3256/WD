<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	const { nt }: { nt: NetworkTables } = $props();
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
		0: 'bg-red-500',
		32: 'bg-slate-500',
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
	export const robotState = $derived(value === null ? '' : robotStateMap?.[value] ?? 'Unknown');
	const color = $derived(value === null ? '' : colorMap?.[value] ?? 'bg-red-500');
</script>

<Card.Root class={`w-fit ${color}`}>
	<Card.Header>
		<Card.Title>Robot State</Card.Title>
	</Card.Header>
	<Card.Content class="text-xl">
		{#if value !== null}
			{#if value === 0}
				<p>Disconnected</p>
			{:else if value === 32}
				<p class="flashing-element">Disabled</p>
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
			<div class="text-gray-400">No value</div>
		{/if}
	</Card.Content>
</Card.Root>

<style>
	/* Define the flashing animation */
	@keyframes flash {
		0% {
			color: red;
		}
		50% {
			color: white;
		}
		100% {
			color: red;
		}
	}

	/* Apply the animation to an element */
	.flashing-element {
		color: red;
		animation: flash 0.2s 20 alternate; /* alternate for flashing back and forth */
	}
</style>

<script lang="ts">
	import { NetworkTablesTypeInfos, type NetworkTables } from 'ntcore-ts-client';
	import NtElement from './NTElement.svelte';
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index';

	import { ntEntry } from '$lib/components/ntEntry.svelte';
	import Separator from './ui/separator/separator.svelte';
	import BooleanViewer from './BooleanViewer.svelte';
	const {
		nt
	}: {
		nt: NetworkTables;
	} = $props();
	const INFORMATION = $derived({
		'DriverStation Attached': ntEntry(nt, '/AdvantageKit/DriverStation/DSAttached', 'boolean'),
		'FMS Attached': ntEntry(nt, '/AdvantageKit/DriverStation/FMSAttached', 'boolean')
	});
	// const dsAttatched = ntEntry(nt, '/AdvantageKit/DriverStation/DSAttached', 'boolean');
	// const fmsAttatched = ntEntry(nt, '/AdvantageKit/DriverStation/fmsAttached', 'boolean');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Match Info</Card.Title>
	</Card.Header>
	<Card.Content>
		<ScrollArea class="h-fit w-fit rounded-md">
			<!-- <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4> -->
			{#each Object.entries(INFORMATION) as [name, entry]}
				<div class="text-sm">
					<BooleanViewer {name} value={entry.value} />
				</div>
			{/each}
		</ScrollArea>
	</Card.Content>
</Card.Root>

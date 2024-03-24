<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import * as Command from '$lib/components/ui/command/index';
	import * as Popover from '$lib/components/ui/popover/index';
	import { Button } from '$lib/components/ui/button/index';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';

	const { nt }: { nt: NetworkTables } = $props();
	const autoOptionsTopic = $derived(
		nt.createTopic<string[]>(
			'/SmartDashboard/Auto Chooser/options',
			NetworkTablesTypeInfos.kStringArray
		)
	);
	const currentAutoTopic = $derived(
		nt.createTopic<string>('/SmartDashboard/Auto Chooser/selected', NetworkTablesTypeInfos.kString)
	);
	// const setAutoTopic = $derived(
	// 	nt.createTopic<string>('/SmartDashboard/Auto Chooser/selected', NetworkTablesTypeInfos.kString)
	// );
	let options = $state<string[] | null>(null);

	let open = $state(false);
	let value = $state('');
	$effect(() => {
		autoOptionsTopic.subscribe((newValue: string[] | null) => {
			options = newValue?.filter((f) => f !== 'None') ?? null;
		}, true);
		currentAutoTopic.subscribe((newValue: string | null) => {
			if (newValue === 'None') {
				value = '';
			} else {
				value = newValue ?? '';
			}
		}, true);
	});

	const selectedValue = $derived((options ?? []).find((f) => f === value) ?? 'Select an auto...');

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Card.Root class="w-fit">
	<Card.Header>
		<Card.Title>Auto Chooser</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if options === null}
			<p>FMS Disconnected!</p>
		{:else}
			<Popover.Root bind:open let:ids>
				<Popover.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class="w-fit justify-between"
					>
						{selectedValue}
						<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-fit p-0">
					<Command.Root>
						<Command.Input placeholder="Search auto..." class="h-9" />
						<Command.List>
							<Command.Empty>No auto found.</Command.Empty>
							<Command.Group>
								{#each options as framework}
									<Command.Item
										value={framework}
										onSelect={async (currentValue) => {
											if (!currentAutoTopic.publisher) await currentAutoTopic.publish();
											currentAutoTopic.setValue(currentValue);
											value = currentValue;
											closeAndFocusTrigger(ids.trigger);
										}}
									>
										<Check class={cn('mr-2 h-4 w-4', value !== framework && 'text-transparent')} />
										{framework}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		{/if}
	</Card.Content>
</Card.Root>

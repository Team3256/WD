<script lang="ts">
	import FMSControlData from '$lib/components/FMSControlData.svelte';
	import MatchTimer from '$lib/components/MatchTimer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';

	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { NetworkTables } from 'ntcore-ts-client';
	import { onMount } from 'svelte';
	import AutoChooser from '$lib/components/AutoChooser.svelte';
	import NtElement from '$lib/components/NTElement.svelte';
	import Subsystems from '$lib/components/Subsystems.svelte';
	const TEAM_NUM = 3256;
	let devMode = $state(true);
	const nt = $derived(
		devMode
			? NetworkTables.getInstanceByURI('localhost')
			: NetworkTables.getInstanceByTeam(TEAM_NUM)
	);
	let active = $state(false);
</script>

<main class="dark:bg-black dark:text-white">
	<h1 class="my-3 text-center text-4xl">William's Demise</h1>
	<div class="flex justify-center">
		<div class="flex items-center space-x-2">
			<Switch id="airplane-mode" bind:checked={devMode} />
			<Label for="airplane-mode">Dev Mode</Label>
		</div>
	</div>
	<div class="my-3 flex h-[30vh] w-full justify-center space-x-2 px-3">
		<FMSControlData
			{nt}
			onChange={(robotState) => {
				if (
					robotState === 'Disconnected' ||
					robotState === 'Unknown' ||
					robotState === 'Disabled'
				) {
					active = false;
					return;
				}
				if (!active) {
					active = true;
				}
			}}
		/>
		<MatchTimer {active} />
	</div>

	<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
	<div class="flex w-full justify-stretch space-x-2 px-3">
		<Subsystems />
		<div class="flex">
			<AutoChooser {nt} />
			<div>
				<NtElement
					name="Team Number"
					path="/AdvantageKit/SystemStats/TeamNumber"
					type="integer"
					{nt}
					class="w-full"
				/>
				<NtElement
					name="Match Number"
					path="/FMSInfo/MatchNumber"
					{nt}
					type="integer"
					class="w-full"
				/>
			</div>
		</div>
		<NtElement type="double" path="/SmartDashboard/Mod 0 Angle" {nt} />
	</div>
</main>

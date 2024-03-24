<script lang="ts">
	import NtBooleanViewer from '$lib/components/NTBooleanViewer.svelte';
	import NtDoubleViewer from '$lib/components/NTDoubleViewer.svelte';
	import NtIntegerViewer from '$lib/components/NTIntegerViewer.svelte';
	import FMSControlData from '$lib/components/FMSControlData.svelte';
	import MatchTimer from '$lib/components/MatchTimer.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	import { onMount } from 'svelte';
	import AutoChooser from '$lib/components/AutoChooser.svelte';
	const TEAM_NUM = 3256;
	let devMode = $state(true);
	const nt = $derived(
		devMode
			? NetworkTables.getInstanceByURI('localhost')
			: NetworkTables.getInstanceByTeam(TEAM_NUM)
	);
	let robotState = $state('Unknown');
	let active = $state(false);
	$effect(() => {
		if (robotState !== 'Disconnected' || robotState !== 'Unknown' || robotState !== 'Disabled') {
			active = true;
		}
	});
</script>

<main class="dark:bg-black dark:text-white">
	<h1 class="my-3 text-center text-4xl">William's Demise</h1>
	<div class="flex justify-center">
		<div class="flex items-center space-x-2">
			<Switch id="airplane-mode" bind:checked={devMode} />
			<Label for="airplane-mode">Dev Mode</Label>
		</div>
	</div>
	<div class="mx-auto my-3 flex justify-center space-x-2">
		<NtIntegerViewer name="Match Number" path="/FMSInfo/MatchNumber" {nt} /><NtIntegerViewer
			name="Team Number"
			path="/AdvantageKit/SystemStats/TeamNumber"
			{nt}
		/>
		<FMSControlData {nt} bind:robotState />
		<AutoChooser {nt} />
		<MatchTimer {active} />
	</div>

	<!-- <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
	<div class="m-3 flex">
		<NtDoubleViewer path="/SmartDashboard/Mod 0 Angle" {nt} />
	</div>
</main>

<script lang="ts">
	import FMSControlData from '$lib/components/FMSControlData.svelte';
	import MatchTimer from '$lib/components/MatchTimer.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';

	import Label from '$lib/components/ui/label/label.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { NetworkTables } from 'ntcore-ts-client';
	import AutoChooser from '$lib/components/AutoChooser.svelte';
	import NtElement from '$lib/components/NTElement.svelte';
	import MatchInfo from '$lib/components/MatchInfo.svelte';
	import SubsystemsGraphic from '$lib/components/vis/SubsystemsGraphic.svelte';
	import SwerveGraphic from '$lib/components/vis/SwerveGraphic.svelte';
	import AprilTagVisible from '$lib/components/AprilTagVisible.svelte';
	let teamNum = $state(3256);
	let devMode = $state(false);
	const nt = $derived(
		devMode ? NetworkTables.getInstanceByURI('localhost') : NetworkTables.getInstanceByTeam(teamNum)
	);
	let active = $state(false);
</script>

<!-- <h1 class="my-3 text-center text-4xl">William's Demise</h1>
<div class="flex justify-center">
	<div class="flex items-center space-x-2">
		<Switch id="airplane-mode" bind:checked={devMode} />
		<Label for="airplane-mode">Dev Mode</Label>
	</div>
</div> -->
<div class="my-3 flex h-[20vh] w-full justify-center space-x-2 px-3">
	<FMSControlData
		{nt}
		onChange={(robotState) => {
			if (robotState === 'Disconnected' || robotState === 'Unknown' || robotState === 'Disabled') {
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
<div class="flex w-full">
	<div class="h-fit flex-[50%] flex-col justify-start px-3">
		<div class="flex">
			<AutoChooser {nt} />
			<MatchInfo {nt} />
			<NtElement
				{nt}
				path="/AdvantageKit/RealOutputs/PivotShooter/Degrees"
				type="double"
				name="Pivot Shooter degrees"
			/>
			<AprilTagVisible
				{nt}
				path="/AdvantageKit/RealOutputs/PivotShooter/IsSpeakerTag"
				name="Speaker AprilTag visible"
			/>
		</div>
		<div class="flex pt-3">
			<div class="w-full flex-[50%]">
				<SwerveGraphic {nt} />
			</div>

			<div class="flex flex-[50%] flex-col pl-3">
				<Card.Root class="w-full">
					<Card.Header>
						<Card.Title>Config</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-5">
						<div class="flex items-center space-x-2">
							<Label for="airplane-mode">Dev Mode</Label>
							<Switch id="airplane-mode" bind:checked={devMode} />
						</div>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label for="team">Team #</Label>
							<Input type="number" id="team" bind:value={teamNum} />
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</div>
	</div>
	<div class="flex-[50%]">
		<SubsystemsGraphic {nt} />
	</div>
</div>

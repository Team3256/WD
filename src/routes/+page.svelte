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
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import AprilTagVisible from '$lib/components/AprilTagVisible.svelte';
	import Subsystems from '$lib/components/Subsystems.svelte';
	let teamNum = $state(3256);
	let devMode = $state(false);
	let address = $state('localhost');
	let port = $state(5801);
	let configMode = $state('simple');
	const nt = $derived(
		configMode === 'simple'
			? devMode
				? NetworkTables.getInstanceByURI('localhost')
				: NetworkTables.getInstanceByTeam(teamNum)
			: NetworkTables.getInstanceByURI(address, port)
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
<div class="my-3 flex w-full justify-center space-x-2 px-3">
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

<!-- <div class="h-fit flex-[50%] flex-col justify-start px-3"> -->
<div class="space-y-3 px-3">
	<div class="flex">
		<Subsystems {nt} />
		<AutoChooser {nt} />
		<MatchInfo {nt} />
		<div class="flex w-full flex-col">
			<AprilTagVisible
				{nt}
				path="/AdvantageKit/RealOutputs/PivotShooter/IsSpeakerTag"
				name="Speaker AprilTag visible"
			/>
			<NtElement
				class="h-full w-full"
				{nt}
				path="/AdvantageKit/RealOutputs/SpeakerDistance"
				type="double"
				name="Speaker Distance"
			/>
		</div>
	</div>
	<!-- </div> -->
	<Card.Root class="w-fit">
		<Card.Header>
			<Card.Title>Config</Card.Title>
		</Card.Header>
		<Card.Content class="space-y-5">
			<Tabs.Root bind:value={configMode} class="w-full">
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="simple">Simple</Tabs.Trigger>
					<Tabs.Trigger value="uri">URI</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="simple">
					<Card.Root>
						<Card.Header>
							<Card.Title>Simple</Card.Title>
							<!-- <Card.Description>
								Make changes to your account here. Click save when you're done.
							</Card.Description> -->
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="flex items-center space-x-2">
								<Label for="airplane-mode">Dev Mode</Label>
								<Switch id="airplane-mode" bind:checked={devMode} />
							</div>
							<div class="grid w-full max-w-sm items-center gap-1.5">
								<Label for="port">Port</Label>
								<Input type="number" id="port" bind:value={port} />
							</div>
						</Card.Content>
					</Card.Root>
				</Tabs.Content>
				<Tabs.Content value="uri">
					<Card.Root>
						<Card.Header>
							<Card.Title>URI</Card.Title>
							<!-- <Card.Description>
								Change your password here. After saving, you'll be logged out.
							</Card.Description> -->
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="grid w-full max-w-sm items-center gap-1.5">
								<Label for="address">Address</Label>
								<Input type="text" id="address" bind:value={address} />
							</div>
							<div class="grid w-full max-w-sm items-center gap-1.5">
								<Label for="team">Port</Label>
								<Input type="number" id="team" bind:value={teamNum} />
							</div>
						</Card.Content>
					</Card.Root>
				</Tabs.Content>
			</Tabs.Root>
		</Card.Content>
	</Card.Root>
</div>
<!-- <div class="flex-[50%]">
		<SubsystemsGraphic {nt} />
	</div> -->

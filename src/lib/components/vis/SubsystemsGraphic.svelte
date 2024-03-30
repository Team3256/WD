<script lang="ts">
	import imgSrc from '$lib/assets/robot.png';
	import { ntEntry } from '../ntEntry.svelte';
	import CurrentDot from './CurrentDot.svelte';
	import type { NetworkTables } from 'ntcore-ts-client';

	const { nt }: { nt: NetworkTables } = $props();
	const intakeCurrent = ntEntry(nt, '/AdvantageKit/RealOutputs/Intake/IntakeCurrent', 'double');
	const passthroughCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/Intake/PassthroughCurrent',
		'double'
	);
	const ampBarCurrent = ntEntry(nt, '/AdvantageKit/RealOutputs/AmpBar/Current', 'double');
	const shooterCurrent = ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/ShooterCurrent', 'double');
	const shooterFollowCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/Shooter/ShooterFollowCurrent',
		'double'
	);
	const feederCurrent = ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/FeederCurrent', 'double');
	// const totalShooterCurrent = $derived(
	// 	(shooterCurrent.value ?? 0) + (shooterFollowCurrent.value ?? 0) + (feederCurrent.value ?? 0)
	// );
</script>

<div class="relative h-fit w-full">
	<img src={imgSrc} alt="" srcset="" class="pr-3" />
	<CurrentDot
		klass="absolute bottom-[30%] left-[30%]"
		name="Intake"
		current={intakeCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute bottom-[50%] left-[50%]"
		name="Passthrough"
		current={passthroughCurrent.value ?? 0}
		limit={30}
	/>
	<CurrentDot
		klass="absolute top-[4%] left-[40%]"
		name="Amp Bar"
		current={ampBarCurrent.value ?? 0}
		limit={5}
	/>
	<CurrentDot
		klass="absolute top-[15%] right-[25%]"
		name="Shooter Left"
		current={shooterCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute top-[15%] left-[40%]"
		name="Shooter Right"
		current={shooterFollowCurrent.value ?? 0}
		limit={60}
	/>
	<!-- <CurrentDot
		{nt}
		klass="absolute bottom-[30%] left-[30%]"
		name="Intake"
		path="/AdvantageKit/RealOutputs/Intake/Current"
	/> -->
</div>

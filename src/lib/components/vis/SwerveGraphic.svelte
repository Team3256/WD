<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import imgSrc from '$lib/assets/swerveBase.png';
	import { ntEntry } from '../ntEntry.svelte';
	import BatteryDot from './BatteryDot.svelte';
	import CurrentDot from './CurrentDot.svelte';
	import type { NetworkTables } from 'ntcore-ts-client';
	import ScrollArea from '../ui/scroll-area/scroll-area.svelte';
	import CurrentViewer from '../CurrentViewer.svelte';
	import Separator from '../ui/separator/separator.svelte';

	const { nt }: { nt: NetworkTables } = $props();
	const swerveMod0DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule0/DriveMotorCurrent', 'double')
	);
	const swerveMod0AngleCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule0/AngleMotorCurrent', 'double')
	);
	const swerveMod1DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule1/DriveMotorCurrent', 'double')
	);
	const swerveMod1AngleCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule1/AngleMotorCurrent', 'double')
	);
	const swerveMod2DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule2/DriveMotorCurrent', 'double')
	);
	const swerveMod2AngleCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule2/AngleMotorCurrent', 'double')
	);
	const swerveMod3DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule3/DriveMotorCurrent', 'double')
	);
	const swerveMod3AngleCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule3/AngleMotorCurrent', 'double')
	);
	const batteryVoltage = $derived(
		ntEntry(nt, '/AdvantageKit/SystemStats/BatteryVoltage', 'double')
	);
</script>

<!-- Note: Out of date because we're using Subsystems.svelte -->
<Card.Root>
	<Card.Header>
		<Card.Title>Swerve + Battery</Card.Title>
	</Card.Header>
	<Card.Content>
		<ScrollArea class="h-fit w-fit rounded-md">
			<p>Battery Voltage: <BatteryDot klass="inline" voltage={batteryVoltage.value ?? 0} /></p>
			<Separator class="my-5" />
			<CurrentViewer
				name="Front left drive"
				current={swerveMod0DriveCurrent.value ?? 0}
				limit={100}
			/>
			<CurrentViewer
				name="Front left angle"
				current={swerveMod0AngleCurrent.value ?? 0}
				limit={60}
			/>
			<CurrentViewer
				name="Front right drive"
				current={swerveMod1DriveCurrent.value ?? 0}
				limit={100}
			/>
			<CurrentViewer
				name="Front right angle"
				current={swerveMod1AngleCurrent.value ?? 0}
				limit={60}
			/>
			<CurrentViewer
				name="Bottom left drive"
				current={swerveMod2DriveCurrent.value ?? 0}
				limit={100}
			/>
			<CurrentViewer
				name="Bottom left angle"
				current={swerveMod2AngleCurrent.value ?? 0}
				limit={60}
			/>
			<CurrentViewer
				name="Bottom right drive"
				current={swerveMod3DriveCurrent.value ?? 0}
				limit={100}
			/>
			<CurrentViewer
				name="Bottom right angle"
				current={swerveMod3AngleCurrent.value ?? 0}
				limit={60}
			/>
		</ScrollArea>
	</Card.Content>
</Card.Root>

<!-- <div class="relative h-full w-fit">
	<p class="flex justify-center text-xl leading-none">Swerve Front</p>
	<img src={imgSrc} alt="" srcset="" class="bg-black" />
	<CurrentDot
		klass="absolute top-[10%] left-[7%]"
		name="Front left drive"
		current={swerveMod0DriveCurrent.value ?? 0}
		limit={100}
	/>
	<CurrentDot
		klass="absolute top-[20%] left-[7%]"
		name="Front left angle"
		current={swerveMod0AngleCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute top-[10%] right-[7%]"
		name="Front right drive"
		current={swerveMod1DriveCurrent.value ?? 0}
		limit={100}
	/>
	<CurrentDot
		klass="absolute top-[20%] right-[7%]"
		name="Front right angle"
		current={swerveMod1AngleCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute bottom-[60%] left-[7%]"
		name="Bottom left drive"
		current={swerveMod2DriveCurrent.value ?? 0}
		limit={100}
	/>
	<CurrentDot
		klass="absolute bottom-[50%] left-[7%]"
		name="Bottom left angle"
		current={swerveMod2AngleCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute bottom-[60%] right-[7%]"
		name="Bottom right drive"
		current={swerveMod3DriveCurrent.value ?? 0}
		limit={100}
	/>
	<CurrentDot
		klass="absolute bottom-[50%] right-[7%]"
		name="Bottom right angle"
		current={swerveMod3AngleCurrent.value ?? 0}
		limit={60}
	/>
	<BatteryDot klass="absolute left-[40%] top-[15%]" voltage={batteryVoltage.value ?? 0} />
</div> -->

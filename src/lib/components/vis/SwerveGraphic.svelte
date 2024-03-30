<script lang="ts">
	import imgSrc from '$lib/assets/swerveBase.png';
	import { ntEntry } from '../ntEntry.svelte';
	import CurrentDot from './CurrentDot.svelte';
	import type { NetworkTables } from 'ntcore-ts-client';

	const { nt }: { nt: NetworkTables } = $props();
	const swerveMod0DriveCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule0/DriveMotorCurrent',
		'double'
	);
	const swerveMod0AngleCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule0/AngleMotorCurrent',
		'double'
	);
	const swerveMod1DriveCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule1/DriveMotorCurrent',
		'double'
	);
	const swerveMod1AngleCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule1/AngleMotorCurrent',
		'double'
	);
	const swerveMod2DriveCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule2/DriveMotorCurrent',
		'double'
	);
	const swerveMod2AngleCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule2/AngleMotorCurrent',
		'double'
	);
	const swerveMod3DriveCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule3/DriveMotorCurrent',
		'double'
	);
	const swerveMod3AngleCurrent = ntEntry(
		nt,
		'/AdvantageKit/RealOutputs/SwerveModule3/AngleMotorCurrent',
		'double'
	);
</script>

<div class="relative h-full w-fit">
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
		klass="absolute bottom-[20%] left-[7%]"
		name="Bottom left drive"
		current={swerveMod2DriveCurrent.value ?? 0}
		limit={100}
	/>
	<CurrentDot
		klass="absolute bottom-[10%] left-[7%]"
		name="Bottom left angle"
		current={swerveMod2AngleCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute bottom-[20%] right-[7%]"
		name="Bottom right drive"
		current={swerveMod3DriveCurrent.value ?? 0}
		limit={100}
	/>
	<CurrentDot
		klass="absolute bottom-[10%] right-[7%]"
		name="Bottom right angle"
		current={swerveMod3AngleCurrent.value ?? 0}
		limit={60}
	/>
</div>

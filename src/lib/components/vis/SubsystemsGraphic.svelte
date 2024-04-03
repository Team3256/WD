<script lang="ts">
	import imgSrc from '$lib/assets/robot.png';
	import { ntEntry } from '../ntEntry.svelte';
	import CurrentDot from './CurrentDot.svelte';
	import type { NetworkTables } from 'ntcore-ts-client';

	const { nt }: { nt: NetworkTables } = $props();
	const intakeCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Intake/IntakeCurrent', 'double')
	);
	const passthroughCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Intake/PassthroughCurrent', 'double')
	);
	const ampBarCurrent = $derived(ntEntry(nt, '/AdvantageKit/RealOutputs/AmpBar/Current', 'double'));
	const shooterCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/ShooterCurrent', 'double')
	);
	const shooterFollowCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/ShooterFollowCurrent', 'double')
	);
	// const feederCurrent = $derived(ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/FeederCurrent', 'double'));
	const pivotShooterCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/PivotShooter/Current', 'double')
	);

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
	const totalSwerveDriveMotorCurrent = $derived(
		(swerveMod0DriveCurrent.value ?? 0) +
			(swerveMod1DriveCurrent.value ?? 0) +
			(swerveMod2DriveCurrent.value ?? 0) +
			(swerveMod3DriveCurrent.value ?? 0)
	);
	const totalSwerveAngleMotorCurrent = $derived(
		(swerveMod0AngleCurrent.value ?? 0) +
			(swerveMod1AngleCurrent.value ?? 0) +
			(swerveMod2AngleCurrent.value ?? 0) +
			(swerveMod3AngleCurrent.value ?? 0)
	);
</script>

<!-- Note: Out of date because we're using Subsystems.svelte -->
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
	<CurrentDot
		klass="absolute top-[25%] left-[50%]"
		name="Shooter Pivot"
		current={pivotShooterCurrent.value ?? 0}
		limit={60}
	/>
	<CurrentDot
		klass="absolute bottom-[20%] right-[30%]"
		name="Total Swerve Drive"
		current={totalSwerveDriveMotorCurrent}
		limit={400}
	/>
	<CurrentDot
		klass="absolute bottom-[20%] right-[10%]"
		name="Total Swerve Angle"
		current={totalSwerveAngleMotorCurrent}
		limit={240}
	/>
	<!-- <CurrentDot
		{nt}
		klass="absolute bottom-[30%] left-[30%]"
		name="Intake"
		path="/AdvantageKit/RealOutputs/Intake/Current"
	/> -->
</div>

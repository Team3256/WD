<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { NetworkTables } from 'ntcore-ts-client';
	import { ntEntry } from './ntEntry.svelte';
	import CurrentViewer from './CurrentViewer.svelte';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
	const { nt }: { nt: NetworkTables } = $props();
	const intakeCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Intake/IntakeCurrent', 'double')
	);
	const intakePivotCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/PivotIntake/Current', 'double')
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
	const totalShooterCurrent = $derived(
		(shooterCurrent.value ?? 0) + (shooterFollowCurrent.value ?? 0) //+ (pivotShooterCurrent.value ?? 0)
	);
	const intakeAndPassthroughCurrent = $derived(
		(intakeCurrent.value ?? 0) + (passthroughCurrent.value ?? 0)
	);
</script>

<div class="flex w-full flex-col">
	<Card.Root>
		<Card.Header>
			<Card.Title>Subsystems</Card.Title>
		</Card.Header>
		<Card.Content>
			<ScrollArea class="h-fit w-fit rounded-md">
				<CurrentViewer
					name="Intake + Passthrough"
					current={intakeAndPassthroughCurrent}
					limit={90}
				/>
				<CurrentViewer name="Intake Pivot" current={intakePivotCurrent.value ?? 0} limit={100} />
				<CurrentViewer name="Amp Bar" current={ampBarCurrent.value ?? 0} limit={5} />
				<CurrentViewer name="Total Shooter" current={totalShooterCurrent ?? 0} limit={120} />
				<!-- <CurrentViewer name="Shooter Left" current={shooterCurrent.value ?? 0} limit={60} />
				<CurrentViewer name="Shooter Right" current={shooterFollowCurrent.value ?? 0} limit={60} /> -->
				<CurrentViewer name="Shooter Pivot" current={pivotShooterCurrent.value ?? 0} limit={60} />
				<CurrentViewer
					name="Total Swerve Drive Current"
					current={totalSwerveDriveMotorCurrent}
					limit={400}
				/>
				<CurrentViewer
					name="Total Swerve Angle Current"
					current={totalSwerveAngleMotorCurrent}
					limit={240}
				/>
			</ScrollArea>
			<!-- {#if value !== null}
            {#if value}
                <code class="text-mono text-bold text-lg">TRUE</code>
            {:else}
                <code class="text-mono text-bold text-lg">FALSE</code>
            {/if}
        {:else}
            <div class="text-gray-400">No value</div>
        {/if} -->
		</Card.Content>
	</Card.Root>
</div>

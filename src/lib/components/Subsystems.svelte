<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { NetworkTables } from 'ntcore-ts-client';
	import { ntEntry } from './ntEntry.svelte';
	import CurrentViewer from './CurrentViewer.svelte';
	import ScrollArea from './ui/scroll-area/scroll-area.svelte';
	const { nt }: { nt: NetworkTables } = $props();
	const intakeCurrent = $derived(ntEntry(nt, '/AdvantageKit/RealOutputs/Intake/Current', 'double'));
	const swerveMod0DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule0/DriveMotorCurrent', 'double')
	);
	const swerveMod1DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule1/DriveMotorCurrent', 'double')
	);
	const swerveMod2DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule2/DriveMotorCurrent', 'double')
	);
	const swerveMod3DriveCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/SwerveModule3/DriveMotorCurrent', 'double')
	);
	const totalSwerveDriveMotorCurrent = $derived(
		(swerveMod0DriveCurrent.value ?? 0) +
			(swerveMod1DriveCurrent.value ?? 0) +
			(swerveMod2DriveCurrent.value ?? 0) +
			(swerveMod3DriveCurrent.value ?? 0)
	);
	const shooterCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/ShooterCurrent', 'double')
	);
	const shooterFollowCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/ShooterFollowCurrent', 'double')
	);
	const feederCurrent = $derived(
		ntEntry(nt, '/AdvantageKit/RealOutputs/Shooter/FeederCurrent', 'double')
	);
	const totalShooterCurrent = $derived(
		(shooterCurrent.value ?? 0) + (shooterFollowCurrent.value ?? 0) + (feederCurrent.value ?? 0)
	);
</script>

<div class="flex w-[500px] flex-col">
	<Card.Root>
		<Card.Header>
			<Card.Title>Subsystems</Card.Title>
		</Card.Header>
		<Card.Content>
			<ScrollArea class="h-fit w-fit rounded-md">
				<CurrentViewer name="Intake Current" current={intakeCurrent.value ?? 0} />
				<CurrentViewer
					name="Total Swerve Drive Motor Current"
					current={totalSwerveDriveMotorCurrent}
				/>
				<CurrentViewer name="Total Shooter Current" current={totalShooterCurrent} />
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

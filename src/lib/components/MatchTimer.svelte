<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as Card from './ui/card/index';

	const { active }: { active: boolean } = $props();
	let minutes = $state(0);
	let seconds = $state(0);
	let interval;

	function startTimer() {
		interval = setInterval(() => {
			if (seconds === 59) {
				minutes++;
				seconds = 0;
			} else {
				seconds++;
			}
		}, 1000);
	}

	function stopTimer() {
		clearInterval(interval);
	}

	$effect(() => {
		if (active) {
			startTimer();
			seconds = 0;
			minutes = 0;
			return stopTimer;
		}
	});
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Title>Match Clock (estimated)</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if active}
			<p class="dynamic-text-size text-center">
				{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</p>
		{:else}
			<p class="dynamic-text-size text-center">Not Active</p>
		{/if}
		<!-- {#if value !== null}
			<code class="text-mono">{value}</code>
		{:else}
			<div class="text-gray-400">No value</div>
		{/if} -->
	</Card.Content>
</Card.Root>

<style>
	.dynamic-text-size {
		font-size: 10vh;
	}
</style>

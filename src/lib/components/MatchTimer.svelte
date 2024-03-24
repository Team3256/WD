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
			return stopTimer;
		}
	});
</script>

<Card.Root class="w-fit">
	<Card.Header>
		<Card.Title>Match Clock (estimated)</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
		<!-- {#if value !== null}
			<code class="text-mono">{value}</code>
		{:else}
			<div class="text-gray-400">No value</div>
		{/if} -->
	</Card.Content>
</Card.Root>

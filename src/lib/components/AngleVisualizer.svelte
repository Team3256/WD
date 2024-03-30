<script lang="ts">
	const { angle }: { angle: number } = $props();

	function calculateRotation() {
		return `rotate(${angle}deg)`;
	}
</script>

<div class="angle-visualizer">
	<div class="angle-indicator"></div>
</div>

<style>
    .angle-visualizer {
        width: 200px;
        height: 200px;
        border: 1px solid black;
        position: relative;
    }

    .angle-indicator {
        width: 100%;
        height: 2px;
        background-color: blue;
        position: absolute;
        top: 50%;
        left: 0;
        transform-origin: left center;
        transform: ${calculateRotation()};
    }
</style>

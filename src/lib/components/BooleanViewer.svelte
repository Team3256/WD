<script lang="ts">
	const { value, name }: { name: string; value: null | boolean } = $props();
</script>

<p class="my-2">
	{name}:
	<span
		class={`rounded p-1 ${value == null ? 'bg-slate-500' : value ? 'bg-green-500' : 'bg-red-500'}`}
		>{value}</span
	>
</p>

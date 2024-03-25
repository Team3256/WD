<script lang="ts">
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	import NtNumberViewer from './NTNumberViewer.svelte';
	import NtStringViewer from './NTStringViewer.svelte';
	import NtBooleanViewer from './NTBooleanViewer.svelte';
	import { ntEntry } from './ntEntry.svelte.ts';
	const {
		nt,
		path,
		type,
		name,
		...props
	}: {
		nt: NetworkTables;
		path: string;
		type: 'double' | 'integer' | 'string' | 'boolean';
		name?: string;
		[key: string]: unknown;
	} = $props();
	type ValueType = typeof name extends 'double'
		? number
		: typeof name extends 'integer'
			? number
			: typeof name extends 'string'
				? string
				: typeof name extends 'boolean'
					? boolean
					: never;
	const ntTopic = $derived(ntEntry<ValueType>(nt, path, type));
</script>

{#if type === 'integer' || type === 'double'}
	<NtNumberViewer value={ntTopic.value} name={name ?? ntTopic.path} {...props} />
{:else if type === 'string'}
	<NtStringViewer value={ntTopic.value} name={name ?? ntTopic.path} {...props} />
{:else if type === 'boolean'}
	<NtBooleanViewer value={ntTopic.value} name={name ?? ntTopic.path} {...props} />
{:else}
	<div class="text-red-500">Invalid type</div>
{/if}

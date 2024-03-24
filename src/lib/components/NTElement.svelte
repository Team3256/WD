<script lang="ts">
	import { type NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
	import NtNumberViewer from './NTNumberViewer.svelte';
	import NtStringViewer from './NTStringViewer.svelte';
	import NtBooleanViewer from './NTBooleanViewer.svelte';
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
	const topic = $derived(
		nt.createTopic<ValueType>(
			path,
			type === 'double'
				? NetworkTablesTypeInfos.kDouble
				: type === 'integer'
					? NetworkTablesTypeInfos.kInteger
					: type === 'string'
						? NetworkTablesTypeInfos.kString
						: NetworkTablesTypeInfos.kBoolean
		)
	);
	let value = $state<ValueType | null>(null);
	$effect(() => {
		topic.subscribe((newValue: ValueType | null) => {
			value = newValue;
		}, true);
	});
</script>

{#if type === 'integer' || type === 'double'}
	<NtNumberViewer {value} name={name ?? topic.name} {...props} />
{:else if type === 'string'}
	<NtStringViewer {value} name={name ?? topic.name} {...props} />
{:else if type === 'boolean'}
	<NtBooleanViewer {value} name={name ?? topic.name} {...props} />
{:else}
	<div class="text-red-500">Invalid type</div>
{/if}

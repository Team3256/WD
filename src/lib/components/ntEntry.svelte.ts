import {
	type NetworkTables,
	NetworkTablesTypeInfos,
	type NetworkTablesTypeInfo,
	type NetworkTablesTypes,
} from "ntcore-ts-client";
type PossibleTypes = "double" | "integer" | "string" | "boolean";

export function ntEntry<
	A extends PossibleTypes,
	B extends NetworkTablesTypes = A extends "double"
		? number
		: A extends "integer"
		  ? number
		  : A extends "string"
			  ? string
			  : A extends "boolean"
				  ? boolean
				  : never,
>(nt: NetworkTables, path: string, type: A) {
	let value = $state<B | null>(null);
	const TYPE_MAP: Record<PossibleTypes, NetworkTablesTypeInfo> = {
		double: NetworkTablesTypeInfos.kDouble,
		integer: NetworkTablesTypeInfos.kInteger,
		string: NetworkTablesTypeInfos.kString,
		boolean: NetworkTablesTypeInfos.kBoolean,
	};
	const resolvedType = TYPE_MAP[type];
	const topic = nt.createTopic<B>(path, resolvedType);
	topic.subscribe((newValue: B | null) => {
		value = newValue;
	});
	return {
		get path() {
			return path;
		},
		get value() {
			return value;
		},
		get type() {
			return type;
		},
		async set(newValue: B) {
			if (!topic.publisher) await topic.publish();
			topic.setValue(newValue);
		},
	};
}

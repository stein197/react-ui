export type InputType = "boolean" | "number" | "string" | "list" | "range" | "color";

export type PropDescriptorMap<T> = {
	[K in keyof T]: PropDescriptor
}

export type PropDescriptor = BooleanPropDescriptor | NumberPropDescriptor | StringPropDescriptor | ListPropDescriptor | RangePropDescriptor

type BooleanPropDescriptor = {
	type: "boolean";
	defaultValue?: boolean;
}

type NumberPropDescriptor = {
	type: "number";
	defaultValue?: number;
}

type StringPropDescriptor = {
	type: "string" | "color";
	defaultValue?: string;
}

type ListPropDescriptor = {
	type: "list";
	defaultValue?: string;
	data: string[];
}

type RangePropDescriptor = {
	type: "range";
	defaultValue?: number;
	min: number;
	max: number;
	step: number;
}

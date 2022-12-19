export type InputType = "boolean" | "number" | "string" | "list" | "range" | "color" | "any";

export type PropDescriptorMap<T> = {
	[K in keyof T]: PropDescriptor
}

export type PropDescriptor = BooleanPropDescriptor | NumberPropDescriptor | StringPropDescriptor | ListPropDescriptor | RangePropDescriptor | AnyPropDescriptor;

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

type AnyPropDescriptor = {
	type: "any";
	defaultValue?: any;
	[k: string]: any;
}
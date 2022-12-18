export type InputType = "boolean" | "number" | "string" | "list" | "range" | "color";

export type PropDescriptorMap<T> = {
	[K in keyof T]: PropDescriptor<T[K]>;
}

export type PropDescriptor<T> = {
	type: InputType;
	defaultValue?: T;
	data?: string[];
	min?: number;
	max?: number;
	step?: number;
}

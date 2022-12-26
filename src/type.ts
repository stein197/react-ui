import type PromiseState from "@stein197/util/PromiseState";

export type UseAsync<T, U> = {
	state: PromiseState;
	value?: T;
	error?: U;
	run?(): void;
}

export type UseToggle = {
	state: boolean;
	toggle(): void;
}

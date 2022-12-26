import type PromiseState from "@stein197/util/PromiseState";

export type UseAsync<T, U = any> = {
	state: PromiseState;
	value?: T;
	error?: U;
}

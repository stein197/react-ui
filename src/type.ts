import type PromiseState from "@stein197/util/PromiseState";

export type UseAsync<T, U> = {

	/**
	 * State of the promise.
	 */
	state: PromiseState;

	/**
	 * Value of the fulfilled promise.
	 */
	value?: T;

	/**
	 * Error of the rejected promise.
	 */
	error?: U;

	/**
	 * Runs promise.
	 */
	run?(): void;
}

export type UseToggle = {

	/**
	 * State of the toggle.
	 */
	state: boolean;

	/**
	 * Toggles the state.
	 */
	toggle(): void;
}

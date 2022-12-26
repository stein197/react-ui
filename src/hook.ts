import * as React from "react";
import PromiseState from "@stein197/util/PromiseState";
import type * as type from "./type";

// TODO: Tests
/**
 * React hook for promise.
 * @param promise Promise to depend on.
 * @returns Promise state, promise value and promise error if any.
 * @example
 * ```tsx
 * function Component() {
 * 	const {state, value, error} = useAsync(new Promise(resolve => setTimeout(resolve, 1000)));
 * 	return (
 * 		<div>State: {state}, Value: {value}</div>
 * 	);
 * }
 * ```
 */
export function useAsync<T, U = any>(promise: Promise<T>): type.UseAsync<T, U>;

/**
 * React hook for promise.
 * @param f Function that should return promise.
 * @param run Should the function be called immediatly. If so, additional `run` property will be returned from the hook
 *            that can be used to trigger promise to execute. `true` by default.
 * @returns Promise state, promise value, promise error if any and function to execute if `{@link run} === false`.
 * @example
 * ```tsx
 * function Component() {
 * 	const {state, value, error, run} = useAsync(() => new Promise(resolve => setTimeout(resolve, 1000)), false);
 * 	React.useEffect(() => run(), []);
 * 	return (
 * 		<div>State: {state}, Value: {value}</div>
 * 	);
 * }
 * ```
 */
export function useAsync<T, U = any>(f: () => Promise<T>, run: boolean): type.UseAsync<T, U>;

export function useAsync<T, U = any>(a: Promise<T> | (() => Promise<T>), run: boolean = true): type.UseAsync<T, U> {
	const [state, setState] = React.useState<PromiseState>(PromiseState.Pending);
	const [value, setValue] = React.useState<T>();
	const [error, setError] = React.useState<U>();
	const isPromise = a instanceof Promise;
	const runCallback = isPromise || run ? undefined : React.useCallback((): void => {
		a().then(value => {
			setState(PromiseState.Fulfilled);
			setValue(value);
		}).catch(error => {
			setState(PromiseState.Rejected);
			setError(error);
		});
	}, [a]);
	React.useEffect((): void => {
		if (!isPromise || !run)
			return;
		a.then(value => {
			setState(PromiseState.Fulfilled);
			setValue(value);
		}).catch(error => {
			setState(PromiseState.Rejected);
			setError(error);
		});
	}, [a]);
	const result: type.UseAsync<T, U> = {state, value, error};
	if (!isPromise && !run)
		result.run = runCallback;
	return result;
}

/**
 * Returns toggleable state.
 * @param init Initial value.
 * @returns Current value and a function to toggle it.
 * @example
 * ```tsx
 * function Component() {
 * 	const {state, toggle} = useToggle(true);
 * 	return (
 * 		<>
 * 			<div>Toggled: {state}</div>
 * 			<button onClick={toggle}>Toggle</button>
 * 		</>
 * 	);
 * }
 * ```
 */
export function useToggle(init: boolean): type.UseToggle {
	const [state, setState] = React.useState(init);
	const toggle = React.useCallback(() => setState(!state), []);
	return {state, toggle};
}

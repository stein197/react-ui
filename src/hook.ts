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
 * 	const [state, value, error] = useAsync(new Promise(resolve => setTimeout(resolve, 1000)));
 * 	return (
 * 		<div>State: {state}, Value: {value}</div>
 * 	);
 * }
 * ```
 */
export function useAsync<T, U = any>(promise: Promise<T>): type.UseAsync<T, U> {
	const [state, setState] = React.useState<PromiseState>(PromiseState.Pending);
	const [value, setValue] = React.useState<T>();
	const [error, setError] = React.useState<U>();
	React.useEffect((): void => {
		promise.then(value => {
			setState(PromiseState.Fulfilled);
			setValue(value);
		}).catch(error => {
			setState(PromiseState.Rejected);
			setError(error);
		});
	}, [promise]);
	return {state, value, error};
}

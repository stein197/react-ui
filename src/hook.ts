import * as React from "react";
import PromiseState from "@stein197/util/PromiseState";
import type * as type from "./type";

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
 * 	const [state, value, error, run] = useAsync(() => new Promise(resolve => setTimeout(resolve, 1000)), false);
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
	const result: type.UseAsync<T, U> = [state, value, error];
	if (!isPromise && !run)
		result.push(runCallback);
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
	const toggle = React.useCallback(() => setState(state => !state), []);
	return [state, toggle];
}

/**
 * Utilizes the value of a previous render.
 * @param value Which value to observe.
 * @returns Value from previous render.
 */
export function usePrev<T>(value: T): T {
	const ref = React.useRef<T>(value);
	React.useEffect(() => void (ref.current = value), [value]);
	return ref.current;
}

/**
 * Counter hook.
 * @param initial Initial counter value.
 * @param min Minial value. `-Infinity` by default.
 * @param max Maximum value. `Infinity` by default.
 * @param overflow Should counter overflow or not. If `true` and counter reached the min or max threshold, then the
 *                 value will be reset to opposite boundary (for example: `min` is 0, `max` is 10 and the value is `10`.
 *                 Incrementing the value by 1 will set it to 0). Otherwise does nothing. `false` by default.
 * @returns The current value and the callback to manage the value.
 * @example
 * ```tsx
 * function Component() {
 * 	const {value, increment} = useCounter(0, 0, 255, false);
 * 	return (
 * 		<div>
 * 			<button onClick={() => increment(-1)}>-</button>
 * 			<input type="text" value={value} />
 * 			<button onClick={() => increment(1)}>+</button>
 * 		</div>
 * 	);
 * }
 * ```
 */
export function useCounter(initial: number, min: number = -Infinity, max: number = Infinity, overflow: boolean = false): type.UseCounter {
	const [value, setValue] = React.useState(initial);
	const increment = React.useCallback((step: number): void => {
		let newValue = value + step;
		const lessThanMin = newValue < min;
		const greaterThanMax = max < newValue;
		if (!overflow && (lessThanMin || greaterThanMax))
			return;
		if (lessThanMin) {
			const rest = min - newValue - 1;
			newValue = max - rest;
		} else if (greaterThanMax) {
			const rest = newValue - max - 1;
			newValue = min + rest;
		}
		setValue(newValue);
	}, []);
	return [value, increment];
}

/**
 * Fires any time pointer enters/leaves a target.
 * @param ref Ref to an object to observe.
 * @returns Ref that should be assigned to target element and hovered flag.
 * @example
 * ```tsx
 * function Component() {
 * 	const ref = React.useRef();
 * 	const hovered = useHover(ref);
 * 	return (
 * 		<p ref={ref}>Hovered: {hovered.toString()}</p>
 * 	);
 * }
 * ```
 */
export function useHover<T extends Element = Element>(ref: React.RefObject<T>): boolean {
	const [hovered, setHovered] = React.useState(false);
	React.useEffect(() => {
		const element = ref.current;
		if (!element)
			return;
		const onPointerEnter = () => setHovered(true);
		const onPointerLeave = () => setHovered(false);
		element.addEventListener("pointerenter", onPointerEnter);
		element.addEventListener("pointerleave", onPointerLeave);
		return (): void => {
			element.removeEventListener("pointerenter", onPointerEnter);
			element.removeEventListener("pointerleave", onPointerLeave);
		}
	}, [ref.current]);
	return hovered;
}

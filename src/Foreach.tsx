import * as React from "react";

/**
 * Replacement for `items.map(...)` construction.
 * @example
 * ```tsx
 * <Foreach items={["First", "Second", "Third"]}>
 * 	{(item, index) => (
 * 		<p key={index}>item: {item}, index: {index}</p>
 * 	)}
 * </Foreach>
 * ```
 */
export default class Foreach<T> extends React.Component<Props<T>> {

	public override render(): React.ReactNode {
		return this.props.data.map((item, index) => this.props.children(item, index));
	}
}

type Props<T> = {

	/**
	 * Data to walk through.
	 */
	data: T[];

	/**
	 * Callback to be called per every item in {@link Props.data}. 
	 * @param item An item.
	 * @param index An index of the item.
	 * @returns Contents to render.
	 */
	children(item: T, index: number): React.ReactNode;
}

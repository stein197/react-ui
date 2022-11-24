import * as React from "react";

// TODO: Documentation, tests
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
	 * @returns The contents to render.
	 */
	children(item: T, index: number): React.ReactNode;
}

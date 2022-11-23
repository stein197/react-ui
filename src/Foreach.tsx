import * as React from "react";

// TODO: Documentation, tests
export default class Foreach<T> extends React.Component<Props<T>> {

	public override render(): React.ReactNode {
		return this.props.data.map((item, index) => this.props.children(item, index));
	}
}

// TODO: Documentation
type Props<T> = {
	data: T[];
	children(item: T, index: number): React.ReactNode;
}

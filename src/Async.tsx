import React from "react";

export default class Async<T> extends React.PureComponent<Props<T>, State<T>> {

	public constructor(props: Props<T>) {
		super(props);
		props.promise.then(result => this.setState({result}));
	}

	public render(): React.ReactNode {
		return "result" in this.state ? (typeof this.props.children === "function" ? this.props.children(this.state.result!) : this.props.children) : null;
	}
}

type Props<T> = {
	promise: Promise<T>;
	children: ((result: T) => React.ReactNode) | React.ReactNode;
}

type State<T> = {
	result?: T;
}

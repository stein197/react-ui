import React from "react";
import {PromiseState} from "@stein197/ts-util";

/**
 * Renders its children only when the promise is resolved.
 */
export default class Async<T, U = any> extends React.PureComponent<Props<T, U>, State<T, U>> {

	public constructor(props: Props<T, U>) {
		super(props);
		this.state = {
			state: PromiseState.Pending
		};
		props.promise.then(result => this.setState({
			result,
			reason: undefined,
			state: PromiseState.Fulfilled,
		})).catch(reason => this.setState({
			result: undefined,
			reason,
			state: PromiseState.Rejected
		}));
	}

	public override render(): React.ReactNode {
		switch (this.state.state) {
			case PromiseState.Pending:
				return this.props.stub;
			case PromiseState.Rejected:
				return typeof this.props.fallback === "function" ? this.props.fallback(this.state.reason!) : this.props.fallback;
			case PromiseState.Fulfilled:
				return typeof this.props.children === "function" ? this.props.children(this.state.result!) : this.props.children;
		}
	}
}

type Props<T, U> = {

	/**
	 * Promise to wait for resolving.
	 */
	promise: Promise<T>;

	/**
	 * Content to render after the promise is resolved. If it's a function then it accepts the result of a promise as
	 * the only argument.
	 */
	children: ((result: T) => React.ReactNode) | React.ReactNode;

	/**
	 * Content to render in case of rejected promise. If it's a function then it accepts the error of a promise as the
	 * only argument.
	 */
	fallback?: ((reason: U) => React.ReactNode) | React.ReactNode;

	/**
	 * Content to render while promise is pending.
	 */
	stub?: React.ReactNode;
}

type State<T, U> = {
	result?: T;
	reason?: U;
	state: PromiseState;
}

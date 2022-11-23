import * as React from "react";

// TODO: Documentation, tests
export default class For extends React.Component<Props> {

	public static readonly defaultProps: Partial<Props> = {
		from: 0
	};

	public override render(): React.ReactNode {
		const result = new Array(this.props.to - this.props.from);
		for (let i = 0; i < result.length; i++) {
			const realIndex = i + this.props.from;
			result[realIndex] = this.props.children(realIndex);
		}
		return result;
	}
}

// TODO: Documentation
type Props = {
	from?: number;
	to: number;
	children(index: number): React.ReactNode;
}

import * as React from "react";

// TODO: Documentation, tests
export default class For extends React.Component<Props> {

	public static readonly defaultProps = {
		from: 0
	}

	private readonly from: number;
	private readonly to: number;

	public constructor(props: Props) {
		super(props);
		this.from = +props.from!;
		this.to = +props.to;
		if (this.to < this.from)
			throw new Error(`props.to (${this.to}) is less than props.from (${this.from})`);
	}

	public override render(): React.ReactNode {
		const diff = this.to - this.from;
		const result = new Array(diff ? diff + 1 : diff);
		console.log(this.from, this.to);
		for (let i = 0; i < result.length; i++) {
			const realIndex = i + this.from;
			result[i] = this.props.children(realIndex);
		}
		return result;
	}
}

// TODO: Documentation
type Props = {
	from?: number | `${number}`;
	to: number | `${number}`;
	children(index: number): React.ReactNode;
}

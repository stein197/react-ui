import * as React from "react";

/**
 * For-loop as a react component.
 * @example
 * ```tsx
 * <For from="1" to="3">
 * 	{i => (
 * 		<p key={i}>index: {i}</p>
 * 	)}
 * </For>
 * ```
 */
export default class For extends React.Component<Props> {

	public static readonly defaultProps = {
		from: 0
	}

	private get from(): number {
		return +this.props.from!;
	}

	private get to(): number {
		return +this.props.to;
	}

	public constructor(props: Props) {
		super(props);
		this.checkInput();
	}

	public override componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
		this.checkInput();
	}

	public override render(): React.ReactNode {
		const diff = this.to - this.from;
		const result = new Array(diff ? diff + 1 : diff);
		for (let i = 0; i < result.length; i++) {
			const realIndex = i + this.from;
			result[i] = this.props.children(realIndex);
		}
		return result;
	}

	private checkInput(): void {
		if (this.to < this.from)
			throw new Error(`props.to (${this.to}) is less than props.from (${this.from})`);
	}
}

type Props = {

	/**
	 * From which to start counting. 0 by default.
	 */
	from?: number | `${number}`;

	/**
	 * A number until which to proceed counting including the number itself.
	 */
	to: number | `${number}`;

	/**
	 * Callback to be called per every loop.
	 * @param index Current index of the loop, starting from {@link Props.from} until {@link Props.to}.
	 * @returns The contents to render.
	 */
	children(index: number): React.ReactNode;
}

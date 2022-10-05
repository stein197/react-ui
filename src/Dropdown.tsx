import React from "react";

export default class Dropdown extends React.PureComponent<Props, State> {

	private get className(): string {
		const className = [
			"dropdown"
		];
		if (this.props.className)
			className.push(this.props.className);
		return className.join(" ");
	}

	private get listStyle(): React.CSSProperties {
		return {
			display: this.state.listVisible ? "block" : "none",
			position: "absolute",
			left: "0",
			top: "100%",
			width: "100%"
		};
	}

	public constructor(props: Props) {
		super(props);
		this.state = {
			listVisible: false
		};
		this.onPointerEnter = this.onPointerEnter.bind(this);
		this.onPointerLeave = this.onPointerLeave.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onInput = this.onInput.bind(this);
		this.onItemClick = this.onItemClick.bind(this);
	}

	public render(): React.ReactNode {
		return (
			<div className={this.className} onPointerEnter={this.onPointerEnter} onPointerLeave={this.onPointerLeave}>
				<input className="dropdown-input" type="text" placeholder={this.props.placeholder} value={this.props.defaultValue} onFocus={this.onFocus} onBlur={this.onBlur} onInput={this.onInput} />
				<div className="dropdown-list" style={this.listStyle}>
					{this.props.data.map(item => (
						<div key={item} className="dropdown-item" onClick={this.onItemClick} data-value={item} dangerouslySetInnerHTML={{__html: "" /* TODO */}} />
					))}
				</div>
			</div>
		);
	}

	// TODO
	private onPointerEnter(e: React.SyntheticEvent<HTMLDivElement, PointerEvent>): void {}

	// TODO
	private onPointerLeave(e: React.SyntheticEvent<HTMLDivElement, PointerEvent>): void {}

	// TODO
	private onFocus(e: React.SyntheticEvent<HTMLInputElement, FocusEvent>): void {}

	// TODO
	private onBlur(e: React.SyntheticEvent<HTMLInputElement, FocusEvent>): void {}

	// TODO
	private onInput(e: React.SyntheticEvent<HTMLInputElement, InputEvent>): void {}

	// TODO
	private onItemClick(e: React.SyntheticEvent<HTMLDivElement, MouseEvent>): void {}
}

type Props = {

	/**
	 * List of items for dropdown to show.
	 */
	data: string[];

	/**
	 * Text to be shown as a placeholder for the input.
	 */
	placeholder?: string;

	/**
	 * Default value. Should be one of the values included in {@link Props.data}.
	 */
	defaultValue?: string;

	/**
	 * CSS-class.
	 */
	className?: string;

	// TODO: onChange?(value: string): void;
}

type State = {
	listVisible: boolean;
}

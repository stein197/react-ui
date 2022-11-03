// TODO: Replace an item searcing in array with searching in trie
import React from "react";

/**
 * Throws an error if {@link Props.defaultValue} is not contained in {@link Props.children}.
 */
export default class Dropdown extends React.PureComponent<Props, State> {

	private static readonly STYLE: React.CSSProperties = {
		position: "relative"
	};

	private static readonly LIST_STYLE: React.CSSProperties = {
		position: "absolute",
		left: "0",
		top: "100%",
		width: "100%",
		listStyle: "none"
	};

	private get className(): string {
		const className = [
			"dropdown", this.state.state
		];
		if (this.props.className)
			className.push(this.props.className);
		return className.join(" ");
	}

	public constructor(props: Props) {
		super(props);
		if (props.defaultValue && !props.children.includes(props.defaultValue))
			throw new Error(`The value "${props.defaultValue}" of props.defaultValue does not match any of the entries in props.children array`);
		this.state = {
			value: props.defaultValue ?? "",
			items: props.children,
			state: "collapsed",
			pointerInside: false
		};
	}

	public render(): React.ReactNode {
		return (
			<div className={this.className} style={Dropdown.STYLE} onPointerEnter={this.onPointerEnter} onPointerLeave={this.onPointerLeave}>
				<input type="text" placeholder={this.props.placeholder} value={this.state.value} onFocus={this.onFocus} onBlur={this.onBlur} onInput={this.onInput} />
				{this.state.state === "expanded" && (
					<ul style={Dropdown.LIST_STYLE}>
						{this.state.items.map(item => (
							<li key={item} onClick={this.onItemClick} data-value={item} dangerouslySetInnerHTML={{__html: Dropdown.highlight(this.state.value, item)}} />
						))}
					</ul>
				)}
			</div>
		);
	}

	private onPointerEnter = (): void => {
		this.setState({
			pointerInside: true
		});
	}

	private onPointerLeave = (): void => {
		this.setState({
			pointerInside: false
		});
	}

	private onFocus = (): void => {
		this.setState({
			state: "expanded"
		});
	}

	private onBlur = (): void => {
		if (!this.state.pointerInside)
			this.setState({
				state: "collapsed"
			});
	}

	private onInput = (e: React.SyntheticEvent<HTMLInputElement, InputEvent>): void => {
		const target = e.target as HTMLInputElement;
		const words = Dropdown.splitToWords(target.value);
		const items = this.props.children.filter(item => words.some(w => item.toLowerCase().includes(w)));
		this.setState({
			value: target.value,
			items
		});
		this.props.onChange?.(target.value, !!items.length);
	}

	private onItemClick = (e: React.SyntheticEvent<HTMLLIElement, MouseEvent>): void => {
		const target = e.target as HTMLDivElement;
		const value = target.getAttribute("data-value")!;
		this.setState({
			state: "collapsed",
			value,
			items: [
				value
			]
		});
		this.props.onChange?.(value, true);
	}

	private static highlight(input: string, string: string): string {
		const words = Dropdown.splitToWords(input);
		const regex = new RegExp(words.join("|"), "gui");
		return string.replace(regex, "<span class=\"hl\">$&</span>");
	}

	private static splitToWords(input: string): string[] {
		return input.toLowerCase().split(/\s+/g);
	}
}

type Props = {

	/**
	 * List of items for dropdown to show.
	 */
	children: string[];

	/**
	 * Text to be shown as a placeholder for the input.
	 */
	placeholder?: string;

	/**
	 * Default value. Should be one of the values included in {@link Props.children}.
	 */
	defaultValue?: string;

	/**
	 * CSS class.
	 */
	className?: string;

	/**
	 * Fires each time input changes it's value.
	 * @param value Current input's value.
	 * @param valid `true` if the value matches at least one item in the {@link Props.children}.
	 */
	onChange?(value: string, valid: boolean): void;
}

type State = {
	value: string;
	items: string[];
	state: "expanded" | "collapsed";
	pointerInside: boolean;
}

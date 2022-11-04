import React from "react";
import KeyboardCode from "@stein197/util/KeyboardCode";

/**
 * Simple dropdown component. Works the same as plain <select /> element except that this dropdown can be stylized.
 * Throws an error if {@link Props.defaultValue} is not contained in {@link Props.data}.
 */
export default class Dropdown extends React.PureComponent<Props, State> {

	public static defaultProps: Partial<Props> = {
		editable: true
	};

	private get className(): string {
		const className = [
			"dropdown", this.state.state
		];
		if (this.props.className)
			className.push(this.props.className);
		return className.join(" ");
	}

	private readonly ref: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

	public constructor(props: Props) {
		super(props);
		if (props.defaultValue && !props.data.includes(props.defaultValue))
			throw new Error(`The value "${props.defaultValue}" of props.defaultValue does not match any of the entries in props.children array`);
		this.state = {
			value: props.defaultValue ?? "",
			items: props.data,
			state: "collapsed",
			index: -1,
			pointerInside: false,
		};
	}

	// TODO: Replace with Intersection Observer API (https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) since it's more optimized for this kind of tasks
	public override componentDidUpdate(prevProps, prevState: Readonly<State>): void {
		if (this.state.index === prevState.index || this.state.state === "collapsed")
			return;
		const liElement = this.ref.current!.querySelector<HTMLLIElement>(`[data-index="${this.state.index}"]`)!;
		const ulRect = this.ref.current!.querySelector("ul")!.getBoundingClientRect();
		const liRect = liElement.getBoundingClientRect();
		const shouldScroll = liRect.top < ulRect.top || ulRect.bottom < liRect.top || liRect.bottom < ulRect.top || ulRect.bottom < liRect.bottom;
		if (shouldScroll)
			liElement.scrollIntoView(this.state.index < prevState.index);
	}

	// TODO: Remove dirty hack with onPointerEnter and onPointerLeave
	public render(): React.ReactNode {
		return (
			<div ref={this.ref} className={this.className} onPointerEnter={this.onPointerEnter} onPointerLeave={this.onPointerLeave}>
				<input name={this.props.name} type="text" autoComplete="off" readOnly={!this.props.editable} placeholder={this.props.placeholder} value={this.state.value} onFocus={this.onFocus} onBlur={this.onBlur} onInput={this.onInput} onKeyDown={this.onKeyDown} />
				{this.state.state === "expanded" && (
					<ul>
						{this.state.items.map((item, i) => (
							<li key={item} className={this.getListItemClassName(item, i)} onPointerUp={this.onItemPointerUp} onPointerEnter={this.onPointerEnterItem} data-value={item} data-index={i} dangerouslySetInnerHTML={{__html: Dropdown.highlight(this.state.value, item)}} />
						))}
					</ul>
				)}
			</div>
		);
	}

	private getListItemClassName(item: string, index: number): string {
		const className: string[] = [];
		if (this.state.value === item)
			className.push("active");
		if (this.state.index === index)
			className.push("focused");
		return className.join(" ");
	}

	private onPointerEnterItem = (e: React.SyntheticEvent<HTMLLIElement, PointerEvent>): void => {
		this.setState({
			index: +(e.target as HTMLLIElement).getAttribute("data-index")!
		});
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
			this.setCollapsedState();
	}

	private onInput = (e: React.SyntheticEvent<HTMLInputElement, InputEvent>): void => {
		const target = e.target as HTMLInputElement;
		const words = Dropdown.splitToWords(target.value);
		const items = this.props.editable ? this.props.data.filter(item => words.every(w => item.toLowerCase().includes(w))) : this.props.data;
		this.setState({
			value: target.value,
			state: "expanded",
			items,
		});
		this.props.onChange?.(target.value, items.length ? items.length === 1 && items[0] === target.value ? "valid" : "match" : "invalid");
	}

	private onItemPointerUp = (e: React.SyntheticEvent<HTMLLIElement, MouseEvent>): void => {
		const target = e.target as HTMLDivElement;
		const value = target.getAttribute("data-value")!;
		this.setValueState(value);
		this.props.onChange?.(value, "valid");
	}

	// TODO: Add scroll to focused items
	private onKeyDown = (e: React.SyntheticEvent<HTMLInputElement, KeyboardEvent>): void => {
		if (e.nativeEvent.code === KeyboardCode.Up || e.nativeEvent.code === KeyboardCode.Down)
			e.preventDefault();
		switch (e.nativeEvent.code) {
			case KeyboardCode.Esc: {
				this.setCollapsedState();
				break;
			}
			case KeyboardCode.Enter: {
				if (this.state.index < 0)
					this.setCollapsedState();
				else
					this.setValueState(this.state.items[this.state.index]);
				break;
			}
			case KeyboardCode.Up: {
				if (this.state.index < 0)
					return this.setState({
						index: 0
					});
				const isFirst = this.state.index === 0;
				if (isFirst)
					this.setState({
						index: this.state.items.length - 1
					});
				else
					this.setState({
						index: this.state.index - 1
					});
				break;
			}
			case KeyboardCode.Down: {
				if (this.state.index < 0)
					return this.setState({
						index: 0
					});
				const isLast = this.state.index + 1 === this.state.items.length;
				if (isLast)
					this.setState({
						index: 0
					});
				else
					this.setState({
						index: this.state.index + 1
					});
				break;
			}
			default: {
				return;
			}
		}
	}

	private setValueState(value: string): void {
		const items = this.props.editable ? [value] : this.props.data;
		this.setState({
			value,
			items,
			index: -1,
			state: "collapsed"
		})
	}

	private setCollapsedState(): void {
		this.setState({
			state: "collapsed",
			index: -1
		})
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
	data: string[];

	/**
	 * Name of the inner input.
	 */
	name?: string;

	/**
	 * `true` if an input need to be editable. `true` by default.
	 */
	editable?: boolean;

	/**
	 * Text to be shown as a placeholder for the input.
	 */
	placeholder?: string;

	/**
	 * Default value. Should be one of the values included in {@link Props.data}.
	 */
	defaultValue?: string;

	/**
	 * CSS class.
	 */
	className?: string;

	/**
	 * Fires each time input changes it's value.
	 * @param value Current input's value.
	 * @param state Denotes the state of the input's value. Could be one of three values:
	 *              - "valid". The value is one of the entries in the list
	 *              - "invalid". The value does not match any item in the list
	 *              - "match". The value matches one or more items in the list
	 */
	onChange?(value: string, state: "valid" | "invalid" | "match"): void;
}

type State = {
	value: string;
	items: string[];
	state: "expanded" | "collapsed";
	index: number;
	pointerInside: boolean;
}

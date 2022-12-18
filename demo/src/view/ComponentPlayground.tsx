import React from "react";
import array from "@stein197/util/array";
import type * as type from "../type";

export default class ComponentPlayground<T extends React.ComponentType<React.ComponentProps<T>>> extends React.Component<Props<T>, State<T>> {

	private readonly __desc: Required<type.PropDescriptorMap<React.ComponentProps<T>>>;

	private get componentName(): string {
		return this.props.name ?? this.props.component.name;
	}

	public constructor(props: Props<T>) {
		super(props);
		this.state = {
			props: {
				...(this.props.component.defaultProps ?? {}),
				// @ts-ignore
				...Object.fromEntries(Object.entries(props.props).map(([key, desc]) => [key, desc.defaultValue]).filter(([, value]) => value != null))
			}
		};
		// @ts-ignore
		this.__desc = props.props;
		const presentPropKeys = Object.keys(props.props);
		const defaultPropKeys = Object.keys(props.component.defaultProps ?? {});
		const allPropKeys = array.uniq([...defaultPropKeys, ...presentPropKeys]);
		const missingPropKeys = array.diff(allPropKeys, presentPropKeys);
		for (const key of missingPropKeys) {
			this.__desc[key] = {
				type: typeof this.state.props[key],
				defaultValue: this.state.props[key]
			};
		}
	}

	public override render(): React.ReactNode {
		return (
			<>
				<p className="h2 text-mono">{this.props.title ?? `<${this.componentName} />`}</p>
				<div className="card">
					<table>
						<tbody>
							{Object.entries<type.PropDescriptor>(this.__desc).map(([key, desc]) => {
								const value = this.state.props[key];
								return (
									<tr key={key} data-name={key}>
										<td>{key}</td>
										<td>
											{desc.type === "boolean" ? (
												<input type="checkbox" defaultChecked={value} onChange={this.onChange} />
											) : desc.type === "number" ? (
												<input type="number" defaultValue={value} onChange={this.onChange} />
											) : desc.type === "list" ? (
												<select defaultValue={value} onChange={this.onChange}>
													{desc.data.map(s => (
														<option key={s} value={s}>{s}</option>
													))}
												</select>
											) : desc.type === "range" ? (
												<input type="range" defaultValue={value} min={desc.min} max={desc.max} step={desc.step} onChange={this.onChange} />
											) : desc.type === "color" ? (
												<input type="color" defaultValue={value} onChange={this.onChange} />
											) : (
												<input type="text" defaultValue={value} onChange={this.onChange} />
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<pre className="card-white">{this.props.renderCode ? this.props.renderCode(this.componentName, this.state.props) : ComponentPlayground.defaultRenderCode(this.componentName, this.state.props)}</pre>
					{/* @ts-ignore */}
					{this.props.children ? this.props.children(this.state.props) : React.createElement(this.props.component, this.state.props)}
				</div>
			</>
		);
	}

	private onChange = (e: React.SyntheticEvent) => {
		let curNode = e.target as Element;
		while (!curNode.getAttribute("data-name") && curNode.parentElement)
			curNode = curNode.parentElement;
		const name = curNode.getAttribute("data-name")!;
		const value = (e.target as HTMLInputElement).value;
		const valueType = typeof this.state.props[name];
		this.setState({
			props: {
				...this.state.props,
				[name]: valueType === "boolean" ? (
					(e.target as HTMLInputElement).checked
				) : valueType === "number" ? (
					+value
				) : (
					value
				)
			}
		});
	}

	private static defaultRenderCode<T extends React.ComponentType<React.ComponentProps<T>>>(name: string, props: React.ComponentProps<T>): string {
		return `<${name}\n\t${Object.entries(props as any).map(([key, value]) => `${key}="${value}"`).join("\n\t")}\n/>`;
	}
}


type Props<T extends React.ComponentType<React.ComponentProps<T>>> = {
	name?: string;
	title?: string;
	component: T;
	props: type.PropDescriptorMap<React.ComponentProps<T>>;
	renderCode?(name: string, props: React.ComponentProps<T>): string;
	children?(props: React.ComponentProps<T>): React.ReactNode;
}

type State<T extends React.ComponentType<React.ComponentProps<T>>> = {
	props: React.ComponentProps<T>;
}


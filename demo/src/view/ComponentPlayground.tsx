// @ts-nocheck
import React from "react";
import InputType from "../InputType";

export default class ComponentPlayground<T extends React.ComponentType<React.ComponentProps<T>>> extends React.Component<Props<T>, State<T>> {

	private get componentName(): string {
		return this.props.name ?? this.props.component.name;
	}

	public constructor(props: Props<T>) {
		super(props);
		this.state = {
			props: {
				...(this.props.component.defaultProps ?? {}),
				...Object.fromEntries(Object.entries(props.props).map(([key, desc]) => [key, desc.defaultValue]).filter(([, value]) => value != null))
			}
		};
	}

	public override render(): React.ReactNode {
		return (
			<>
				<p className="h2 text-mono">{this.props.title ?? `<${this.componentName} />`}</p>
				<div className="card">
					<table>
						<tbody>
							{Object.entries(this.state.props).map(([key, value]) => {
								const desc: PropDescriptor<any> | null = this.props.props[key];
								const valueType = typeof value;
								return (
									<tr key={key} data-name={key}>
										<td>{key}</td>
										<td>
											{desc ? (
												desc.type === InputType.Boolean ? (
													<input type="checkbox" defaultChecked={value} onChange={this.onChange} />
												) : desc.type === InputType.Number ? (
													<input type="number" defaultValue={value} onChange={this.onChange} />
												) : desc.type === InputType.List ? (
													<select defaultValue={value} onChange={this.onChange}>
														{desc.data.map(s => (
															<option key={s} value={s}>{s}</option>
														))}
													</select>
												) : desc.type === InputType.Range ? (
													<input type="range" min={desc.min} max={desc.max} step={desc.step} onChange={this.onChange} />
												) : desc.type === InputType.Color ? (
													<input type="color" defaultValue={value} onChange={this.onChange} />
												) : (
													<input type="text" defaultValue={value} onChange={this.onChange} />
												)
											) : (
												valueType === "boolean" ? (
													<input type="checkbox" defaultChecked={value} onChange={this.onChange} />
												) : valueType === "number" ? (
													<input type="number" defaultValue={value} onChange={this.onChange} />
												) : (
													<input type="text" defaultValue={value} onChange={this.onChange} />
												)
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<pre className="card-white">{this.props.renderCode ? this.props.renderCode(this.componentName, this.state.props) : ComponentPlayground.defaultRenderCode(this.componentName, this.state.props)}</pre>
					{this.props.children ? this.props.children(this.state.props) : React.createElement(this.props.component, this.state.props)}
				</div>
			</>
		);
	}

	private onChange = (e: React.SyntheticEvent) => {
		let curNode = e.target as Element;
		while (!curNode.getAttribute("data-name"))
			curNode = curNode.parentElement;
		const name = curNode.getAttribute("data-name");
		const value = e.target.value;
		const valueType = typeof this.state.props[name];
		this.setState({
			props: {
				...this.state.props,
				[name]: valueType === "boolean" ? (
					e.target.checked
				) : valueType === "number" ? (
					+value
				) : (
					value
				)
			}
		});
	}

	private static defaultRenderCode(name: string, props): string {
		return `<${name}\n\t${Object.entries(props).map(([key, value]) => `${key}="${value}"`).join("\n\t")}\n/>`;
	}
}


type Props<T extends React.ComponentType<React.ComponentProps<T>>> = {
	name?: string;
	title?: string;
	component: T;
	props: PropsDescriptor<React.ComponentProps<T>>;
	renderCode?(name: string, props: React.ComponentProps<T>): string;
	children?(props: React.ComponentProps<T>): React.ReactNode;
}

type State<T extends React.ComponentType<React.ComponentProps<T>>> = {
	props: React.ComponentProps<T>;
}

type PropsDescriptor<T> = {
	[K in keyof T]: PropDescriptor<T[K]>;
}

type PropDescriptor<T> = {
	type: InputType;
	defaultValue?: T;
	data?: string[];
	min?: number;
	max?: number;
	step?: number;
}

// TODO: Documentation, tests, Maybe we should use React.Children
export function Switch(props: SwitchProps): JSX.Element {
	const children = props.children == null ? [] : Array.isArray(props.children) ? props.children : [props.children];
	return children.find(child => child.type === Case && child.props?.value === props.value) ?? children.find(child => child.type === Default);
}

// TODO: Documentation, tests
export function Case(props: CaseProps): JSX.Element {
	return props.children;
}

// TODO: Documentation, tests
export function Default(props: DefaultProps): JSX.Element {
	return props.children;
}

type SwitchProps = {
	value: any;
	children?: any;
}

type CaseProps = {
	value: any;
	children?: any;
}

type DefaultProps = {
	children?: any;
}

// TODO: Documentation, tests, Maybe we should use React.Children
export function If(props: IfProps): JSX.Element {
	const children = props.children == null ? [] : Array.isArray(props.children) ? props.children : [props.children];
	const thenClause = children.find(child => child.type === Then);
	if (props.value && thenClause)
		return thenClause;
	const elseClause = children.find(child => child.type === Else);
	if (!props.value && elseClause)
		return elseClause;
	return props.value ? props.children : null;
}

// TODO: Documentation, tests
export function Then(props: EmptyProps): JSX.Element {
	return props.children;
}

// TODO: Documentation, tests
export function Else(props: EmptyProps): JSX.Element {
	return props.children;
}

type IfProps = {
	value: boolean;
	children?: any;
}

type EmptyProps = {
	children?: any;
}

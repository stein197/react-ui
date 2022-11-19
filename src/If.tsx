// TODO: Maybe we should use React.Children
/**
 * Component for conditional rendering, instead of using JS operators. It could be used with Then/Else components:
 * ```tsx
 * // Will render the contents of Else component
 * <If value={false}>
 * 	<Then>yes</Then>
 * 	<Else>no</Else>
 * </If>
 * ```
 * Or without them:
 * ```tsx
 * <If value={true}>
 * 	yes
 * </If>
 * ```
 * In that case there is no fallback for falsy value.
 */
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

/**
 * Wrapper for truthy value. Just returns its contents
 */
export function Then(props: EmptyProps): JSX.Element {
	return props.children;
}

/**
 * Wrapper for falsy value. Just returns its contents
 */
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

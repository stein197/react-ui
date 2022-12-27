// TODO: Maybe we should use React.Children
/**
 * Component for conditional rendering, instead of using JS operators. It could be used with Then/Else components:
 * ```tsx
 * // Will render the contents of Else component
 * <If value={false}>
 * 	<Then>yes</Then>
 * 	<ElseIf value={true}>maybe</ElseIf>
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
	const elseIfClauseArray = children.filter(child => child.type === ElseIf);
	for (const elseIfClause of elseIfClauseArray)
		if (elseIfClause.props.value)
			return elseIfClause;
	const elseClause = children.find(child => child.type === Else);
	if (!props.value && elseClause)
		return elseClause;
	return props.value ? props.children : null;
}

/**
 * Then-clause. Returns content when the value is true
 */
export function Then(props: EmptyProps): JSX.Element {
	return props.children;
}

/**
 * Else-clause. Returns content when the value is false
 */
export function Else(props: EmptyProps): JSX.Element {
	return props.children;
}

/**
 * `else if` clause.
 */
export function ElseIf(props: IfProps): JSX.Element {
	return props.children;
}

type IfProps = {

	/**
	 * Value to test.
	 */
	value: boolean;
	children?: any;
}

type EmptyProps = {
	children?: any;
}

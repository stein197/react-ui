import * as object from "@stein197/util/object";

// TODO: Maybe we should use React.Children
/**
 * Component for implementing switch-case-default clause but in JSX. The usage is the same as the usage of ordinary
 * switch statement:
 * ```tsx
 * // This will render the "Second" string
 * <Switch value="2">
 * 	<Case value="1">First</Case>
 * 	<Case value="2">Second</Case>
 * 	<Case value="3">Third</Case>
 * 	<Case value={["4", "5"]}></Case>
 * 	<Default>None</Default>
 * </Switch>
 * ```
 */
export function Switch(props: SwitchProps): JSX.Element {
	const children = props.children == null ? [] : Array.isArray(props.children) ? props.children : [props.children];
	return children.find(child => child.type === Case && (Array.isArray(child.props?.value) ? child.props.value.findIndex(value => object.strictlyEqual(value, props.value)) >= 0 : object.strictlyEqual(child.props?.value, props.value))) ?? children.find(child => child.type === Default);
}

/**
 * The case-clause. Returns the content only when it's the first matched case.
 */
export function Case(props: CaseProps): JSX.Element {
	return props.children;
}

/**
 * The default clause for the switch. Returns the content when there were no matches for any cases
 */
export function Default(props: DefaultProps): JSX.Element {
	return props.children;
}

type SwitchProps = {

	/**
	 * Value to test.
	 */
	value: any;
	children?: any;
}

type CaseProps = {

	/**
	 * Value to match against {@link SwitchProps.value}.
	 */
	value: any;
	children?: any;
}

type DefaultProps = {
	children?: any;
}

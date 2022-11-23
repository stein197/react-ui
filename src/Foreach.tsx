import * as React from "react";

// TODO
export default class Foreach<T> extends React.Component<Props<T>> {}

// TODO: Documentation
type Props<T> = {
	data: T[];
	children(item: T, index: number): React.ReactNode;
}

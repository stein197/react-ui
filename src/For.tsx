import * as React from "react";

// TODO
export default class For extends React.Component<Props> {}

// TODO: Documentation
type Props = {
	from?: number;
	to: number;
	children(index: number): React.ReactNode;
}

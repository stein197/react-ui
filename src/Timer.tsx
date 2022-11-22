import * as React from "react";

// TODO: Add pause, resume methods
// TODO
export default class Timer<T extends number[]> extends React.Component<Props<T>, State> {

	private static readonly MAX_DELAY: number = 2 ** 30;

	public constructor(props: Props<T>) {
		super(props);
		this.validateProps();
	}

	private validateProps(): void {
		for (let i = 0, curStep = this.props.steps[i], prevStep = Infinity; i < this.props.steps.length; prevStep = curStep, curStep = this.props.steps[++i])
			if (prevStep < curStep)
				throw new Error(`The value ${curStep} at index ${i} is greater than the previous one`);
			else if (Timer.MAX_DELAY < curStep)
				throw new Error(`The delay ${curStep} at index ${i} is too big. It should not be greater than ${Timer.MAX_DELAY}`);
	}
}

// TODO: Documentation
type Props<T extends number[]> = {
	to: Date | number;
	steps: T;
	precision: number;
	children(time: T): React.ReactNode;
	onTick?(time: T): void;
	onComplete?(time: T): void;
}

type State = {}

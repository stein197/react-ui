import * as React from "react";

/**
 * Animated circle spinner component.
 */
export default class Spinner extends React.Component<Props> {

	public static readonly defaultProps = {
		strokeWidth: 1,
		strokeColor: "black",
		length: .3,
		duration: 1,
		direction: "clockwise"
	}

	private readonly ref: React.RefObject<SVGSVGElement> = React.createRef();

	private get className(): string {
		const result = [
			"spinner"
		];
		if (this.props.className)
			result.push(this.props.className);
		return result.join(" ");
	}

	private get rootSize(): number {
		return +this.props.r * 2;
	}

	private get realRadius(): number {
		return +this.props.r - Math.ceil(+this.props.strokeWidth / 2);
	}

	private get style(): React.CSSProperties {
		const circleLength = Math.ceil(2 * Math.PI * this.realRadius);
		const segmentLength = Math.round(circleLength * +this.props.length!);
		const gapLength = circleLength - segmentLength;
		return {
			strokeWidth: this.props.strokeWidth,
			stroke: this.props.strokeColor,
			strokeDasharray: `${segmentLength} ${gapLength}`,
			transition: `stroke-dasharray ${this.props.direction}s linear`,
			animation: `spin-clockwise ${this.props.duration}s linear 0s infinite ${this.props.direction === "clockwise" ? "normal" : "reverse"}`
		};
	}

	public override render(): React.ReactNode {
		const size = this.rootSize;
		return (
			<svg ref={this.ref} xmlns="http://www.w3.org/2000/svg" className={this.className} viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={this.style}>
				<circle cx={this.props.r} cy={this.props.r} r={this.realRadius} />
			</svg>
		);
	}
}

type Props = {

	/**
	 * Radius of the circle.
	 */
	r: number | `${number}`;

	/**
	 * Width of the circle's stroke.
	 * @defaultValur `1`
	 */
	strokeWidth: number | `${number}`;

	/**
	 * Color of the circle's stroke.
	 * @defaultValue `"black"`
	 */
	strokeColor?: string;

	/**
	 * Length of the segment. Accepts values from 0 to 1.
	 * @defaultValue `.3`
	 */
	length?: number | `${number}`;

	/**
	 * Duration of one loop of animation in seconds.
	 * @defaultValue `1`
	 */
	duration?: number | `${number}`;

	/**
	 * Direction in which to spin the circle.
	 * @defaultValue `"clockWise"`
	 */
	direction?: "clockwise" | "counter-clockwise";

	/**
	 * Additional CSS classname.
	 */
	className?: string;
}

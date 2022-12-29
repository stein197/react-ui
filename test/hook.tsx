import "mocha";
import * as assert from "assert";
import * as React from "react";
import * as hook from "../src/hook";
import Sandbox from "./Sandbox";

// TODO
describe("hook.useAsync()", () => {});

describe("hook.useToggle()", () => {
	const sandbox = new Sandbox();
	function TestComponent(): JSX.Element {
		const [value, toggle] = hook.useToggle(false);
		return (
			<div>
				<button onClick={toggle}>Toggle</button>
				<p>{value ? "yes" : "no"}</p>
			</div>
		);
	}
	it("Should correctly render initial value", () => {
		sandbox.render(<TestComponent />);
		assert.equal(sandbox.select("p")!.textContent, "no");

	});
	it("Should correctly render after toggling", () => {
		sandbox.render(<TestComponent />);
		sandbox.click("button");
		assert.equal(sandbox.select("p")!.textContent, "yes");
		sandbox.click("button");
		assert.equal(sandbox.select("p")!.textContent, "no");
	});
});

describe("hook.usePrev()", () => {
	const sandbox = new Sandbox();
	function TestComponent(): JSX.Element {
		const [value, setValue] = React.useState(0);
		const prev = hook.usePrev(value);
		return (
			<div>
				<p>prev: {prev}, current: {value}</p>
				<button onClick={() => setValue(value + 1)}>Toggle</button>
			</div>
		);
	}
	it("Should correctly render initial value", () => {
		sandbox.render(<TestComponent />);
		assert.equal(sandbox.select("p")!.textContent, "prev: 0, current: 0");
	});
	it("Should correctly render previous values", () => {
		sandbox.render(<TestComponent />);
		sandbox.click("button");
		assert.equal(sandbox.select("p")!.textContent, "prev: 0, current: 1");
		sandbox.click("button");
		assert.equal(sandbox.select("p")!.textContent, "prev: 1, current: 2");
	});
});

describe("hook.useCounter()", () => {
	const sandbox = new Sandbox();
	function TestComponent({init, min, max, step, overflow}: {init?: number; min?: number; max?: number, step?: number, overflow?: boolean}): JSX.Element {
		step = step ?? 1;
		const [value, increment] = hook.useCounter(init ?? 0, min, max, overflow);
		return (
			<div>
				<button className="plus" onClick={() => increment(step as number)}>+</button>
				<p>{value}</p>
				<button className="minus" onClick={() => increment(-(step as number))}>-</button>
			</div>
		);
	}
	it("Should correctly render initial value", () => {
		sandbox.render(<TestComponent init={12} />);
		assert.equal(sandbox.select("p")!.textContent, "12");
	});
	it("Should correctly increment/decrement value", () => {
		sandbox.render(<TestComponent />);
		sandbox.click(".plus");
		sandbox.click(".plus");
		assert.equal(sandbox.select("p")!.textContent, "2");
		sandbox.click(".minus");
		sandbox.click(".minus");
		sandbox.click(".minus");
		assert.equal(sandbox.select("p")!.textContent, "-1");
	});
	it("Should not exceed lower boundary when \"overflow\" is false", () => {
		sandbox.render(<TestComponent min={-1} overflow={false} />);
		sandbox.click(".minus");
		sandbox.click(".minus");
		sandbox.click(".minus");
		assert.equal(sandbox.select("p")!.textContent, "-1");
	});
	it("Should not exceed upper boundary when \"overflow\" is false", () => {
		sandbox.render(<TestComponent max={1} overflow={false} />);
		sandbox.click(".plus");
		sandbox.click(".plus");
		sandbox.click(".plus");
		assert.equal(sandbox.select("p")!.textContent, "1");
	});
	it("Should correctly overflow the lower boundary when \"overflow\" is true and decrement value is -1", () => {
		sandbox.render(<TestComponent min={-1} max={10} overflow={true} />);
		sandbox.click(".minus");
		sandbox.click(".minus");
		sandbox.click(".minus");
		assert.equal(sandbox.select("p")!.textContent, "9");
	});
	it("Should correctly overflow the upper boundary when \"overflow\" is true and increment value is 1", () => {
		sandbox.render(<TestComponent min={-10} max={1} overflow={true} />);
		sandbox.click(".plus");
		sandbox.click(".plus");
		sandbox.click(".plus");
		assert.equal(sandbox.select("p")!.textContent, "-9");
	});
	it("Should correctly overflow the lower boundary and keep the rest when \"overflow\" is true and decrement value is less than -1", () => {
		sandbox.render(<TestComponent min={-2} max={10} step={3} overflow={true} />);
		sandbox.click(".minus");
		assert.equal(sandbox.select("p")!.textContent, "10");
		sandbox.click(".minus");
		assert.equal(sandbox.select("p")!.textContent, "7");
	});
	it("Should correctly overflow the upper boundary and keep the rest when \"overflow\" is true and increment value is greater than 1", () => {
		sandbox.render(<TestComponent min={-10} max={2} step={4} overflow={true} />);
		sandbox.click(".plus");
		assert.equal(sandbox.select("p")!.textContent, "-9");
		sandbox.click(".plus");
		assert.equal(sandbox.select("p")!.textContent, "-5");
	});
});

// TODO
describe("hook.useHover()", () => {});

// TODO
describe("hook.useResize()", () => {});

// TODO
describe("hook.useFocus()", () => {});

// TODO
describe("hook.useOnline()", () => {});

// TODO
describe("hook.useImage()", () => {});

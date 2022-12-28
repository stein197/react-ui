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

// TODO
describe("hook.useCounter()", () => {});

// TODO
describe("hook.useHover()", () => {});

// TODO
describe("hook.useResize()", () => {});

// TODO
describe("hook.useFocus()", () => {});

// TODO
describe("hook.useOnline()", () => {});

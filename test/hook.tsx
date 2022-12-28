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
		assert.equal(sandbox.container.querySelector("p")!.textContent, "no");

	});
	it("Should correctly render after toggling", () => {
		sandbox.render(<TestComponent />);
		sandbox.click("button");
		assert.equal(sandbox.container.querySelector("p")!.textContent, "yes");
		sandbox.click("button");
		assert.equal(sandbox.container.querySelector("p")!.textContent, "no");
	});
});

// TODO
describe("hook.usePrev()", () => {});

// TODO
describe("hook.useCounter()", () => {});

// TODO
describe("hook.useHover()", () => {});
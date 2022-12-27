import "mocha";
import * as assert from "assert";
import * as React from "react";
import {Switch, Case, Default} from "../src/Switch";
import Sandbox from "./Sandbox";

describe("<Switch />", () => {
	const sandbox = new Sandbox();
	it("Should return the matched case", () => {
		sandbox.render(
			<Switch value="2">
				<Case value="1">First</Case>
				<Case value="2">Second</Case>
				<Case value="3">Third</Case>
				<Default>None</Default>
				<div>garbage</div>
			</Switch>
		);
		assert.equal(sandbox.container.textContent, "Second");
	});
	it("Should return the first matched case when there are more than one equal cases", () => {
		sandbox.render(
			<Switch value="2">
				<Case value="1">First</Case>
				<Case value="2">Second</Case>
				<Case value="2">Third</Case>
				<Default>None</Default>
				<div>garbage</div>
			</Switch>
		);
		assert.equal(sandbox.container.textContent, "Second");
	});
	it("Should return the case with multiple choises when the value matches at least one of them", () => {
		sandbox.render(
			<Switch value="4">
				<Case value="1">First</Case>
				<Case value="2">Second</Case>
				<Case value="3">Third</Case>
				<Case value={["4", "5"]}>Other</Case>
				<Default>None</Default>
				<div>garbage</div>
			</Switch>
		);
		assert.equal(sandbox.container.textContent, "Other");
	});
	it("Should return nothing when there were no matches and there is no default clause", () => {
		sandbox.render(
			<Switch value="0">
				<Case value="1">First</Case>
				<Case value="2">Second</Case>
				<Case value="3">Third</Case>
				<div>garbage</div>
			</Switch>
		);
		assert.equal(sandbox.container.textContent, "");
	});
	it("Should return default clause when there were no matches and there is a default clause", () => {
		sandbox.render(
			<Switch value="0">
				<Case value="1">First</Case>
				<Case value="2">Second</Case>
				<Case value="3">Third</Case>
				<Default>None</Default>
				<div>garbage</div>
			</Switch>
		);
		assert.equal(sandbox.container.textContent, "None");
	});
});
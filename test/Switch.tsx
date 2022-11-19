import * as assert from "assert";
import * as React from "react";
import * as mocha from "mocha";
import {Switch, Case, Default} from "../src/Switch";
import Sandbox from "./Sandbox";

mocha.describe("<Switch />", () => {
	const sandbox = new Sandbox();
	mocha.it("Should return the matched case", () => {
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
	mocha.it("Should return the first matched case when there are more than one equal cases", () => {
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
	mocha.it("Should return nothing when there were no matches and there is no default clause", () => {
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
	mocha.it("Should return default clause when there were no matches and there is a default clause", () => {
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
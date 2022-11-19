import * as assert from "assert";
import * as React from "react";
import {act} from "react-dom/test-utils";
import * as mocha from "mocha";
import {Switch, Case, Default} from "../src/Switch";
import setup from "./setup";

mocha.describe("<Switch />", () => {
	const sandbox = setup();
	mocha.it("Should return the matched case", () => {
		act(() => {
			sandbox.root.render(
				<Switch value="2">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="3">Third</Case>
					<Default>None</Default>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(sandbox.container.textContent, "Second");
	});
	mocha.it("Should return the first matched case when there are more than one equal cases", () => {
		act(() => {
			sandbox.root.render(
				<Switch value="2">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="2">Third</Case>
					<Default>None</Default>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(sandbox.container.textContent, "Second");
	});
	mocha.it("Should return nothing when there were no matches and there is no default clause", () => {
		act(() => {
			sandbox.root.render(
				<Switch value="0">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="3">Third</Case>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(sandbox.container.textContent, "");
	});
	mocha.it("Should return default clause when there were no matches and there is a default clause", () => {
		act(() => {
			sandbox.root.render(
				<Switch value="0">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="3">Third</Case>
					<Default>None</Default>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(sandbox.container.textContent, "None");
	});
});
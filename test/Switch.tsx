import * as assert from "assert";
import * as React from "react";
import {Root, createRoot} from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as mocha from "mocha";
import {Switch, Case, Default} from "../src/Switch";

// TODO: Move the boilerplate setup outside
mocha.describe("<Switch />", () => {
	let container: HTMLDivElement
	let root: Root;
	const oldWindow = global.window;
	const oldDocument = global.document;
	mocha.before(() => {
		global.IS_REACT_ACT_ENVIRONMENT = true
		const dom = new jsdom.JSDOM("", {
			url: "http://localhost"
		});
		// @ts-ignore
		global.window = dom.window;
		global.document = dom.window.document;
		container = document.createElement("div");
		document.body.appendChild(container);
	});
	mocha.after(() => {
		document.body.removeChild(container);
		global.window = oldWindow;
		global.document = oldDocument;
		delete global.IS_REACT_ACT_ENVIRONMENT;
	});
	mocha.beforeEach(() => {
		act(() => {
			root = createRoot(container);
		});
	});
	mocha.afterEach(() => {
		act(() => {
			root.unmount();
		});
	});
	mocha.it("Should return the matched case", () => {
		act(() => {
			root.render(
				<Switch value="2">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="3">Third</Case>
					<Default>None</Default>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(container.textContent, "Second");
	});
	mocha.it("Should return the first matched case when there are more than one equal cases", () => {
		act(() => {
			root.render(
				<Switch value="2">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="2">Third</Case>
					<Default>None</Default>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(container.textContent, "Second");
	});
	mocha.it("Should return nothing when there were no matches and there is no default clause", () => {
		act(() => {
			root.render(
				<Switch value="0">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="3">Third</Case>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(container.textContent, "");
	});
	mocha.it("Should return default clause when there were no matches and there is a default clause", () => {
		act(() => {
			root.render(
				<Switch value="0">
					<Case value="1">First</Case>
					<Case value="2">Second</Case>
					<Case value="3">Third</Case>
					<Default>None</Default>
					<div>garbage</div>
				</Switch>
			);
		});
		assert.equal(container.textContent, "None");
	});
});
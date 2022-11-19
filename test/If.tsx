import * as assert from "assert";
import * as React from "react";
import {Root, createRoot} from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as mocha from "mocha";
import {If, Then, Else} from "../src/If";

mocha.describe("<If>...</If>", () => {
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
	mocha.it("Should return children when value is true and there are no <Then /> or <Else /> clauses", () => {
		act(() => {
			root.render(
				<If value={true}>yes</If>
			);
		});
		assert.equal(container.textContent, "yes");
	});
	mocha.it("Should not return children when value is false and there are no <Then /> or <Else /> clauses", () => {
		act(() => {
			root.render(
				<If value={false}>yes</If>
			);
		});
		assert.equal(container.textContent, "");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are no more children", () => {
		act(() => {
			root.render(
				<If value={true}>
					<Then>yes</Then>
				</If>
			);
		});
		assert.equal(container.textContent, "yes");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are other children", () => {
		act(() => {
			root.render(
				<If value={true}>
					<Then>yes</Then>
					<div>garbage</div>
				</If>
			);
		});
		assert.equal(container.textContent, "yes");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are no more children", () => {
		act(() => {
			root.render(
				<If value={false}>
					<Else>no</Else>
				</If>
			);
		});
		assert.equal(container.textContent, "no");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are other children", () => {
		act(() => {
			root.render(
				<If value={false}>
					<Else>no</Else>
					<div>garbage</div>
				</If>
			);
		});
		assert.equal(container.textContent, "no");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are only <Then /> and <Else /> components", () => {
		act(() => {
			root.render(
				<If value={true}>
					<Then>yes</Then>
					<Else>no</Else>
				</If>
			);
		});
		assert.equal(container.textContent, "yes");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are only <Then /> and <Else /> components", () => {
		act(() => {
			root.render(
				<If value={false}>
					<Then>yes</Then>
					<Else>no</Else>
				</If>
			);
		});
		assert.equal(container.textContent, "no");
	});
});

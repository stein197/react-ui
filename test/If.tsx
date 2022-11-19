import * as assert from "assert";
import * as React from "react";
import {Root, createRoot} from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as mocha from "mocha";
import {If, Then, Else} from "../src/If";
import setup from "./setup";

mocha.describe("<If />", () => {
	const sandbox = setup();
	mocha.it("Should return children when value is true and there are no <Then /> or <Else /> clauses", () => {
		act(() => {
			sandbox.root.render(
				<If value={true}>yes</If>
			);
		});
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should not return children when value is false and there are no <Then /> or <Else /> clauses", () => {
		act(() => {
			sandbox.root.render(
				<If value={false}>yes</If>
			);
		});
		assert.equal(sandbox.container.textContent, "");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are no more children", () => {
		act(() => {
			sandbox.root.render(
				<If value={true}>
					<Then>yes</Then>
				</If>
			);
		});
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are other children", () => {
		act(() => {
			sandbox.root.render(
				<If value={true}>
					<Then>yes</Then>
					<div>garbage</div>
				</If>
			);
		});
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are no more children", () => {
		act(() => {
			sandbox.root.render(
				<If value={false}>
					<Else>no</Else>
				</If>
			);
		});
		assert.equal(sandbox.container.textContent, "no");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are other children", () => {
		act(() => {
			sandbox.root.render(
				<If value={false}>
					<Else>no</Else>
					<div>garbage</div>
				</If>
			);
		});
		assert.equal(sandbox.container.textContent, "no");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are only <Then /> and <Else /> components", () => {
		act(() => {
			sandbox.root.render(
				<If value={true}>
					<Then>yes</Then>
					<Else>no</Else>
				</If>
			);
		});
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are only <Then /> and <Else /> components", () => {
		act(() => {
			sandbox.root.render(
				<If value={false}>
					<Then>yes</Then>
					<Else>no</Else>
				</If>
			);
		});
		assert.equal(sandbox.container.textContent, "no");
	});
});

import * as assert from "assert";
import * as React from "react";
import {Root, createRoot} from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as mocha from "mocha";
import {If, Then, Else} from "../src/If";
import Sandbox from "./Sandbox";

mocha.describe("<If />", () => {
	const sandbox = new Sandbox();
	mocha.it("Should return children when value is true and there are no <Then /> or <Else /> clauses", () => {
		sandbox.render(
			<If value={true}>yes</If>
		);
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should not return children when value is false and there are no <Then /> or <Else /> clauses", () => {
		sandbox.render(
			<If value={false}>yes</If>
		);
		assert.equal(sandbox.container.textContent, "");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are no more children", () => {
		sandbox.render(
			<If value={true}>
				<Then>yes</Then>
			</If>
		);
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are other children", () => {
		sandbox.render(
			<If value={true}>
				<Then>yes</Then>
				<div>garbage</div>
			</If>
		);
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are no more children", () => {
		sandbox.render(
			<If value={false}>
				<Else>no</Else>
			</If>
		);
		assert.equal(sandbox.container.textContent, "no");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are other children", () => {
		sandbox.render(
			<If value={false}>
				<Else>no</Else>
				<div>garbage</div>
			</If>
		);
		assert.equal(sandbox.container.textContent, "no");
	});
	mocha.it("Should return only <Then /> clause when value is true and there are only <Then /> and <Else /> components", () => {
		sandbox.render(
			<If value={true}>
				<Then>yes</Then>
				<Else>no</Else>
			</If>
		);
		assert.equal(sandbox.container.textContent, "yes");
	});
	mocha.it("Should return only <Else /> clause when value is false and there are only <Then /> and <Else /> components", () => {
		sandbox.render(
			<If value={false}>
				<Then>yes</Then>
				<Else>no</Else>
			</If>
		);
		assert.equal(sandbox.container.textContent, "no");
	});
});

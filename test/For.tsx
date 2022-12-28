import "mocha";
import * as assert from "assert";
import * as React from "react";
import Sandbox from "./Sandbox";
import For = require("../src/For");

describe("<For />", () => {
	const sandbox = new Sandbox();
	it("Should render nothing when the loop is empty", () => {
		sandbox.render(
			<For to={0}>
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.innerHTML, "");
	});
	it("Should render nothing when \"from\" and \"to\" are equal", () => {
		sandbox.render(
			<For from={5} to={5}>
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.innerHTML, "");
	});
	it("Should start counting from 0 when \"from\" is not provided", () => {
		sandbox.render(
			<For to={3}>
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.innerHTML, "0123");
	});
	it("Should throw an error when \"to\" is less than \"from\"", () => {
		assert.throws(() => {
			sandbox.render(
				<For to={-3}>
					{i => (
						i
					)}
				</For>
			);
		}, {message: "props.to (-3) is less than props.from (0)"});
	});
	it("Should render correctly when \"from\" is provided", () => {
		sandbox.render(
			<For from="3" to="5">
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.innerHTML, "345");
	});
	it("Should render correctly when \"from\" is less than 0", () => {
		sandbox.render(
			<For from="-2" to="2">
				{i => i}
			</For>
		);
		assert.equal(sandbox.innerHTML, "-2-1012");
	});
	it("Should render correctly when \"from\" and \"to\" is less than 0", () => {
		sandbox.render(
			<For from="-10" to="-8">
				{i => i}
			</For>
		);
		assert.equal(sandbox.innerHTML, "-10-9-8");
	});
});
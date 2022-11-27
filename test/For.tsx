import * as assert from "assert";
import * as React from "react";
import * as mocha from "mocha";
import For from "../src/For";
import Sandbox from "./Sandbox";

mocha.describe("<For />", () => {
	const sandbox = new Sandbox();
	mocha.it("Should render nothing when the loop is empty", () => {
		sandbox.render(
			<For to={0}>
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.container.innerHTML, "");
	});
	mocha.it("Should render nothing when \"from\" and \"to\" are equal", () => {
		sandbox.render(
			<For from={5} to={5}>
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.container.innerHTML, "");
	});
	mocha.it("Should start counting from 0 when \"from\" is not provided", () => {
		sandbox.render(
			<For to={3}>
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.container.innerHTML, "0123");
	});
	mocha.it("Should throw an error when \"to\" is less than \"from\"", () => {
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
	mocha.it("Should render correctly when \"from\" is provided", () => {
		sandbox.render(
			<For from="3" to="5">
				{i => (
					i
				)}
			</For>
		);
		assert.equal(sandbox.container.innerHTML, "345");
	});
	mocha.it("Should render correctly when \"from\" is less than 0", () => {
		sandbox.render(
			<For from="-2" to="2">
				{i => i}
			</For>
		);
		assert.equal(sandbox.container.innerHTML, "-2-1012");
	});
	mocha.it("Should render correctly when \"from\" and \"to\" is less than 0", () => {
		sandbox.render(
			<For from="-10" to="-8">
				{i => i}
			</For>
		);
		assert.equal(sandbox.container.innerHTML, "-10-9-8");
	});
});
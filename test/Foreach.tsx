import * as assert from "assert";
import * as React from "react";
import * as mocha from "mocha";
import Foreach from "../src/Foreach";
import Sandbox from "./Sandbox";

mocha.describe("<Foreach />", () => {
	const sandbox = new Sandbox();
	mocha.it("Should render nothing when an array is empty", () => {
		sandbox.render(
			<Foreach data={[]}>
				{() => (
					"string"
				)}
			</Foreach>
		);
		assert.equal(sandbox.container.innerHTML, "");
	});
	mocha.it("Should pass an item and an index to a callback function", () => {
		const items: string[] = [];
		const indices: number[] = [];
		sandbox.render(
			<Foreach data={["a", "b", "c"]}>
				{(item, i) => {
					items.push(item);
					indices.push(i);
					return null;
				}}
			</Foreach>
		);
		assert.deepStrictEqual(items, ["a", "b", "c"]);
		assert.deepStrictEqual(indices, [0, 1, 2]);
	});
	mocha.it("Should render an expected result", () => {
		sandbox.render(
			<Foreach data={["a", "b", "c"]}>
				{(item, i) => (
					<div key={i}>item: {item}, index: {i}</div>
				)}
			</Foreach>
		);
		assert.equal(sandbox.container.innerHTML, "<div>item: a, index: 0</div><div>item: b, index: 1</div><div>item: c, index: 2</div>");
	});
});
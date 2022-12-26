import * as assert from "assert";
import * as React from "react";
import * as mocha from "mocha";
import Sandbox from "./Sandbox";
import Async = require("../src/Async");

mocha.describe("<Async />", () => {
	const sandbox = new Sandbox();
	mocha.it("Should render the children when the promise is resolved", async () => {
		const promise = timeout(50);
		await sandbox.renderAsync(<Async promise={promise}>Children</Async>, promise);
		assert.equal(sandbox.container.textContent, "Children");
	});
	mocha.it("Should not render anything when the promise is pending and there is no stub", () => {
		sandbox.render(<Async promise={timeout(50)}>Children</Async>);
		assert.equal(sandbox.container.textContent, "");
	});
	mocha.it("Should render stub when the promise is pending and there is a stub", () => {
		sandbox.render(<Async promise={timeout(50)} stub="Pending...">Children</Async>);
		assert.equal(sandbox.container.textContent, "Pending...");
	});
	mocha.it("Should not render anything when the promise is rejected and there is no fallback", async () => {
		const promise = timeout(50, null, null, false);
		await sandbox.renderAsync(<Async promise={promise}>Children</Async>, promise);
		assert.equal(sandbox.container.textContent, "");
	});
	mocha.it("Should render fallback when the promise is rejected and and there is a fallback", async () => {
		const promise = timeout(50, null, null, false);
		await sandbox.renderAsync(<Async promise={promise} fallback="Rejected">Children</Async>, promise);
		assert.equal(sandbox.container.textContent, "Rejected");
	});
	mocha.it("Should pass the resolved value to the children callback", async () => {
		let resolvedValue = "";
		const promise = timeout(50, "Resolved");
		await sandbox.renderAsync(<Async promise={promise}>{resolved => resolvedValue = resolved}</Async>, promise);
		assert.equal(resolvedValue, "Resolved");
	});
	mocha.it("Should pass the rejected value to the fallback callback", async () => {
		let rejectedValue = "";
		const promise = timeout(50, null, "Rejected", false);
		await sandbox.renderAsync(<Async promise={promise} fallback={rejected => rejectedValue = rejected}>Resolved</Async>, promise);
		assert.equal(rejectedValue, "Rejected");
	});
	mocha.it("Should render the result of children callback when the promise is resolved", async () => {
		const promise = timeout(50, "Resolved");
		await sandbox.renderAsync(<Async promise={promise}>{resolved => resolved}</Async>, promise);
		assert.equal(sandbox.container.textContent, "Resolved");
	});
	mocha.it("Should render the result of fallback callback when the promise is rejected", async () => {
		const promise = timeout(50, null, "Rejected", false);
		await sandbox.renderAsync(<Async promise={promise} fallback={rejected => rejected}>{resolved => resolved}</Async>, promise);
		assert.equal(sandbox.container.textContent, "Rejected");
	});
});

function timeout<T, U>(ms: number, resolveValue?: T, rejectValue?: U, resolve: boolean = true): Promise<T> {
	return new Promise<T>((rs, rj): void => void setTimeout((): void => resolve ? rs(resolveValue!) : rj(rejectValue), ms));
}

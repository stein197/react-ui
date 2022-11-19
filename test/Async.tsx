import * as assert from "assert";
import * as React from "react";
import * as mocha from "mocha";
import Async from "../src/Async";
import Sandbox from "./Sandbox";

// TODO: Refactor, place boilerplate to Sandbox.renderAsync()
mocha.describe("<Async />", () => {
	const sandbox = new Sandbox();
	mocha.it("Should render the children when the promise is resolved", async () => {
		const promise = timeout(50);
		sandbox.render(<Async promise={promise}>Children</Async>);
		await promise;
		await timeout(0);
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
		sandbox.render(<Async promise={promise}>Children</Async>);
		try {
			await promise;
		} catch {}
		await timeout(0);
		assert.equal(sandbox.container.textContent, "");
	});
	mocha.it("Should render fallback when the promise is rejected and and there is a fallback", async () => {
		const promise = timeout(50, null, null, false);
		sandbox.render(<Async promise={promise} fallback="Rejected">Children</Async>);
		try {
			await promise;
		} catch {}
		await timeout(0);
		assert.equal(sandbox.container.textContent, "Rejected");
	});
	mocha.it("Should pass the resolved value to the children callback", async () => {
		let resolvedValue = "";
		const promise = timeout(50, "Resolved");
		sandbox.render(<Async promise={promise}>{resolved => resolvedValue = resolved}</Async>);
		await promise;
		await timeout(0);
		assert.equal(resolvedValue, "Resolved");
	});
	mocha.it("Should pass the rejected value to the fallback callback", async () => {
		let rejectedValue = "";
		const promise = timeout(50, null, "Rejected", false);
		sandbox.render(<Async promise={promise} fallback={rejected => rejectedValue = rejected}>Resolved</Async>);
		try {
			await promise;
		} catch {}
		await timeout(0);
		assert.equal(rejectedValue, "Rejected");
	});
	mocha.it("Should render the result of children callback when the promise is resolved", async () => {
		const promise = timeout(50, "Resolved");
		sandbox.render(<Async promise={promise}>{resolved => resolved}</Async>);
		await promise;
		await timeout(0);
		assert.equal(sandbox.container.textContent, "Resolved");
	});
	mocha.it("Should render the result of fallback callback when the promise is rejected", async () => {
		const promise = timeout(50, null, "Rejected", false);
		sandbox.render(<Async promise={promise} fallback={rejected => rejected}>{resolved => resolved}</Async>);
		try {
			await promise;
		} catch {}
		await timeout(0);
		assert.equal(sandbox.container.textContent, "Rejected");
	});
});

function timeout<T, U>(ms: number, resolveValue?: T, rejectValue?: U, resolve: boolean = true): Promise<T> {
	return new Promise<T>((rs, rj): void => void setTimeout((): void => resolve ? rs(resolveValue!) : rj(rejectValue), ms));
}

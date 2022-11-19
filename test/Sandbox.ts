import React from "react";
import {Root, createRoot} from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as mocha from "mocha";

export default class Sandbox {

	public get container(): HTMLDivElement {
		return this.__container!;
	}

	public get root(): Root {
		return this.__root!;
	}

	private __container?: HTMLDivElement;
	private __root?: Root;

	public constructor() {
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
			this.__container = document.createElement("div");
			document.body.appendChild(this.__container);
		});
		mocha.after(() => {
			document.body.removeChild(this.__container!);
			delete this.__container;
			delete this.__root;
			global.window = oldWindow;
			global.document = oldDocument;
			delete global.IS_REACT_ACT_ENVIRONMENT;
		});
		mocha.beforeEach(() => act(() => this.__root = createRoot(this.__container!)));
		mocha.afterEach(() => act(() => this.__root!.unmount()));
	}

	public render(node: React.ReactNode): void {
		act(() => this.root.render(node));
	}

	public async renderAsync<T>(node: React.ReactNode, promise: Promise<T>): Promise<void> {
		this.render(node);
		try {
			await promise;
		} catch {}
		await new Promise(rs => setTimeout(rs, 0));
	}
}

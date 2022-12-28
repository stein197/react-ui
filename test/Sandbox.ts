import "mocha";
import React from "react";
import {Root, createRoot} from "react-dom/client";
import {act, Simulate, SyntheticEventData} from "react-dom/test-utils";
import * as jsdom from "jsdom";

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
		before(() => {
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
		after(() => {
			document.body.removeChild(this.__container!);
			delete this.__container;
			delete this.__root;
			global.window = oldWindow;
			global.document = oldDocument;
			delete global.IS_REACT_ACT_ENVIRONMENT;
		});
		beforeEach(() => act(() => this.__root = createRoot(this.__container!)));
		afterEach(() => act(() => this.__root!.unmount()));
	}

	public render(node: React.ReactNode): void {
		act(() => this.root.render(node));
	}

	public async renderAsync<T>(node: React.ReactNode, promise: Promise<T>): Promise<void> {
		await act(async () => {
			this.render(node);
			try {
				await promise;
			} catch {}
			await new Promise(rs => setTimeout(rs, 0));
		});
	}

	public select<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;

	public select<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;

	public select<E extends Element = Element>(selectors: string): E | null;

	public select<E extends Element = Element>(selector: string): E | null {
		return this.__container!.querySelector(selector);
	}

	public click(selector: string, data?: SyntheticEventData): Promise<void> {
		return this.dispatchEvent(selector, "click", data);
	}

	public dispatchEvent<K extends keyof typeof Simulate>(selector: string, event: K, data?: SyntheticEventData): Promise<void> {
		return act(() => Simulate[event](this.container.querySelector(selector)!, data));
	}
}

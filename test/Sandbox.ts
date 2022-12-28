import "mocha";
import React from "react";
import {Root, createRoot} from "react-dom/client";
import {act, Simulate, SyntheticEventData} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as util from "./util";

export default class Sandbox {

	private __container?: HTMLDivElement;
	private __root?: Root;

	public get textContent(): string | null {
		return this.__container?.textContent ?? null;
	}

	public get innerHTML(): string | null {
		return this.__container?.innerHTML ?? null;
	}

	public constructor() {
		before(() => {
			globalThis.IS_REACT_ACT_ENVIRONMENT = true
			const dom = new jsdom.JSDOM("", {
				url: "http://localhost"
			});
			// @ts-ignore
			util.mock(globalThis, "window", dom.window);
			util.mock(globalThis, "document", dom.window.document);
			this.__container = document.createElement("div");
			document.body.appendChild(this.__container);
		});
		after(() => {
			document.body.removeChild(this.__container!);
			delete this.__container;
			delete this.__root;
			util.unmock(globalThis, "window");
			util.unmock(globalThis, "document");
			delete globalThis.IS_REACT_ACT_ENVIRONMENT;
		});
		beforeEach(() => act(() => this.__root = createRoot(this.__container!)));
		afterEach(() => act(() => this.__root!.unmount()));
	}

	public render(node: React.ReactNode): Promise<void> {
		return act(() => this.__root!.render(node));
	}

	public async renderAsync<T>(node: React.ReactNode, promise: Promise<T>): Promise<void> {
		await act(async () => {
			await this.render(node);
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
		return act(() => Simulate[event](this.__container!.querySelector(selector)!, data));
	}
}

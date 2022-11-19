import {Root, createRoot} from "react-dom/client";
import {act} from "react-dom/test-utils";
import * as jsdom from "jsdom";
import * as mocha from "mocha";

export default function(): Required<Result> {
	const result: Result = {};
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
		result.container = document.createElement("div");
		document.body.appendChild(result.container);
	});
	mocha.after(() => {
		document.body.removeChild(result.container!);
		delete result.container;
		delete result.root;
		global.window = oldWindow;
		global.document = oldDocument;
		delete global.IS_REACT_ACT_ENVIRONMENT;
	});
	mocha.beforeEach(() => {
		act(() => {
			result.root = createRoot(result.container!);
		});
	});
	mocha.afterEach(() => {
		act(() => {
			result.root!.unmount();
		});
	});
	return result as Required<Result>;
}

type Result = {
	container?: HTMLDivElement;
	root?: Root;
}

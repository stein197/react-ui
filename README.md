# React UI
A tiny package that contains a few UI components written in and for React. Demo can be found [here](https://stein197.github.io/react-ui/)

## Installation
```
npm install @stein197/react-ui
```
Then add `index.css` to your stylesheet:
```sass
@import "@stein197/react-ui/index";
```

## Components

### Dropdown
Simple dropdown component. Works the same as plain `<select />` element except that this dropdown can be stylized. The dropdown offers a search functionality by which items can be filtered out. Throws an error if `defaultValue` is not contained in `data`.
```tsx
import React from "react";
import Dropdown from "@stein197/react-ui/Dropdown";

const data = [
	"First",
	"Second",
	"Third"
];
<Dropdown defaultValue="First" placeholder="Select a place" data={data} onChange={console.log} editable={false} />
```

#### Options
| Name           | Type                                                                         | Description                                                                         |
|----------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| `data`         | `string[]`                                                                   | List of items for dropdown to show                                                  |
| `name`         | `?string`                                                                    | Name of the inner input                                                             |
| `enabled`      | `?boolean`                                                                   | Enable or disable dropdown input. `true` by default                                 |
| `required`     | `?boolean`                                                                   | Make the input required. `false` by default                                         |
| `editable`     | `?boolean`                                                                   | Make input editable in order to allow searching among items. `true` by default      |
| `placeholder`  | `?string`                                                                    | Text to be shown as a placeholder for the input                                     |
| `defaultValue` | `?string`                                                                    | Default value. Should be the one of the values included in `data`                   |
| `className`    | `?string`                                                                    | CSS class                                                                           |
| `onChange`     | `(value: string, state: "valid" \| "invalid" \| "match" \| "empty") => void` | Fires each time input changes it's value (typing or selecting values from dropdown) |

### Async
Renders its children only when the promise is resolved.
```tsx
import React from "react";
import Async from "@stein197/react-ui/Async";

<Async promise={new Promise(resolve => setTimeout(resolve, 1000))} fallback={reason => <p>Rejected! Reason: {reason}</p>} stub={<p>Pending...</p>}>
	{result => (
		<p>Resolved! Result: {result}</p>
	)}
</Async>
```

#### Options
| Name       | Type                                                   | Description                                     |
|------------|--------------------------------------------------------|-------------------------------------------------|
| `promise`  | `Promise<T>`                                           | Promise to wait for resolving                   |
| `children` | `((result: T) => React.ReactNode) \| React.ReactNode`  | Content to render after the promise is resolved |
| `fallback` | `?((reason: U) => React.ReactNode) \| React.ReactNode` | Content to render in case of rejected promise   |
| `stub`     | `?React.ReactNode`                                     | Content to render while promise is pending      |

### Switch, Case, Default
Component for implementing switch-case-default clause but in JSX. The usage is the same as the usage of ordinary switch statement.
```tsx
import React from "react";
import {Switch, Case, Default} from "@stein197/react-ui/Switch";

<Switch value="2">
	<Case value="1">First</Case>
	<Case value="2">Second</Case>
	<Case value="3">Third</Case>
	<Default>None</Default>
</Switch>
```

#### Options
| Name    | Type  | Description   |
|---------|-------|---------------|
| `value` | `any` | Value to test |

### If, Then, Else
Component for conditional rendering, instead of using JS operators
```tsx
import React from "react";
import {If, Then, Else} from "@stein197/react-ui/If";

<If value={false}>
	<Then>yes</Then>
	<Else>no</Else>
</If>
```

#### Options
| Name    | Type      | Description   |
|---------|-----------|---------------|
| `value` | `boolean` | Value to test |

> NOTE: More detailed documentation can be found in TSDoc blocks in source code.

## NPM scripts
- `clean` clean the directory out of compiled files
- `build` compile source code
- `test` run unit tests

## Demo
Info to build and run demo can be found [here](demo/README.md)

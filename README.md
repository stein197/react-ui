# React UI
A tiny package that contains a few UI components written in and for React. Demo can be found [here](https://stein197.github.io/react-ui/)

## Installation
```
npm install @stein197/react-ui
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

> NOTE: More detailed documentation can be found in TSDoc blocks in source code.

## NPM scripts
- `clean` clean the directory out of compiled files
- `build` compile source code
- `demo` compile demo source code in `demo` directory
- `demo:watch` the same as `demo` but it watches for changes

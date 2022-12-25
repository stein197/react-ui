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

### Foreach
Replacement for `items.map(...)` construction
```tsx
<Foreach items={["First", "Second", "Third"]}>
	{(item, index) => (
		<p key={index}>item: {item}, index: {index}</p>
	)}
</Foreach>
```

#### Options
| Name       | Type                                          | Description                          |
|------------|-----------------------------------------------|--------------------------------------|
| `data`     | `T[]`                                         | Data to walk through                 |
| `children` | `(item: T, index: number) => React.ReactNode` | Callback to be called per every item |

### For
For-loop as a react component
```tsx
<For from="1" to="3">
	{i => (
		<p key={i}>index: {i}</p>
	)}
</For>
```

#### Options
| Name       | Type                                 | Description                                                          |
|------------|--------------------------------------|----------------------------------------------------------------------|
| `from`     | `number | \`${number}\``             | From which to start counting. 0 by default                           |
| `to`       | `number | \`${number}\``             | A number until which to proceed counting including the number itself |
| `children` | `(index: number) => React.ReactNode` | Callback to be called per every loop                                 |

### Spinner
Animated circle spinner component
```tsx
<Spinner r="50" />
```

#### options
| Name            | Type                                 | Description                                       |
|-----------------|--------------------------------------|---------------------------------------------------|
| `r`             | `number`                             | Radius of the circle                              |
| `strokeWidth`   | `number`                             | Width of the circle's stroke                      |
| `strokeColor`   | `string`                             | Color of the circle's stroke                      |
| `bgStrokeColor` | `string`                             | Color of the background ring stroke               |
| `roundLinecap`  | `boolean`                            | Makes linecaps round for circle                   |
| `length`        | `number`                             | Length of the segment. Accepts values from 0 to 1 |
| `duration`      | `number`                             | Duration of one loop of animation in seconds      |
| `clockwise`     | `boolean`                            | Direction in which to spin the circle             |
| `className`     | `string`                             | Additional CSS classname                          |

> NOTE: More detailed documentation can be found in TSDoc blocks in source code.

## NPM scripts
- `clean` clean the directory out of compiled files
- `build` compile source code
- `test` run unit tests

## Demo
Info to build and run demo can be found [here](demo/README.md)

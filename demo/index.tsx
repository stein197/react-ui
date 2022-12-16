import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "@stein197/react-ui/Dropdown";
import Async from "@stein197/react-ui/Async";
import {Switch, Case, Default} from "@stein197/react-ui/Switch";
import {If, Then, Else} from "@stein197/react-ui/If";
import Foreach from "@stein197/react-ui/Foreach";
import For from "@stein197/react-ui/For";
import Spinner from "@stein197/react-ui/Spinner";

const countryArray: string[] = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Botswana",
	"Brazil",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Côte d'Ivoire",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Comoros",
	"Congo (Congo-Brazzaville)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czechia (Czech Republic)",
	"Democratic Republic of the Congo",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Fiji",
	"Finland",
	"France",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Greece",
	"Grenada",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Holy See",
	"Honduras",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Morocco",
	"Mozambique",
	"Myanmar (formerly Burma)",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"North Korea",
	"North Macedonia",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine State",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Qatar",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Sweden",
	"Switzerland",
	"Syria",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
	"United States of America",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];

document.addEventListener("DOMContentLoaded", () => {
	const rootElement = document.body.querySelector("main")!;
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<div className="container">
			<h1 className="text-center">Demos</h1>
			<DropdownDemo />
			<AsyncDemo />
			<SwitchDemo />
			<IfDemo />
			<ForeachDemo />
			<ForDemo />
			<SpinnerDemo />
		</div>
	);
});

function DropdownDemo(): JSX.Element {
	const [name, setName] = React.useState<string>("country");
	const [enabled, setEnabled] = React.useState<boolean>(true);
	const [required, setRequired] = React.useState<boolean>(false);
	const [editable, setEditable] = React.useState<boolean>(true);
	const [placeholder, setPlaceholder] = React.useState<string>("Select a country");
	const [defaultValue, setDefaultValue] = React.useState<string>(countryArray[0]);
	const [className, setClassName] = React.useState<string>("dropdown-country");
	const [eventValue, setEventValue] = React.useState<{value?: string; state?: string}>({});
	const onChange = React.useCallback((value: string, state: string): void => setEventValue({value, state}), []);

	return (
		<>
			<p className="h2 text-mono">&lt;Dropdown /&gt;</p>
			<div className="card">
				<table>
					<tbody>
						<tr>
							<td>name</td>
							<td>
								<input type="text" value={name} onInput={e => setName((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>enabled</td>
							<td>
								<input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
							</td>
						</tr>
						<tr>
							<td>required</td>
							<td>
								<input type="checkbox" checked={required} onChange={() => setRequired(!required)} />
							</td>
						</tr>
						<tr>
							<td>editable</td>
							<td>
								<input type="checkbox" checked={editable} onChange={() => setEditable(!editable)} />
							</td>
						</tr>
						<tr>
							<td>placeholder</td>
							<td>
								<input type="text" value={placeholder} onInput={e => setPlaceholder((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>defaultValue</td>
							<td>
								<input type="text" value={defaultValue} onInput={e => setDefaultValue((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>className</td>
							<td>
								<input type="text" value={className} onInput={e => setClassName((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
					</tbody>
				</table>
				<pre className="card-white">{JSON.stringify(eventValue, undefined, "\t")}</pre>
				<Dropdown data={countryArray} name={name} enabled={enabled} required={required} editable={editable} placeholder={placeholder} defaultValue={defaultValue} className={className} onChange={onChange} />
			</div>
		</>
	);
}

function AsyncDemo(): JSX.Element {
	const [promiseTimeout, setPromiseTimeout] = React.useState<number>(1000);
	const [shouldResolve, setShouldResolve] = React.useState<boolean>(true);
	const [resolveValue, setResolveValue] = React.useState<string>("Resolved!");
	const [rejectValue, setRejectValue] = React.useState<string>("Rejected!");
	const [childrenValue, setChildrenValue] = React.useState<string>("Children");
	const [fallbackValue, setFallbackValue] = React.useState<string>("Fallback");
	const [stubValue, setStubValue] = React.useState<string>("This is a stub");

	const [running, setRunning] = React.useState<boolean>(false);
	const [promise, setPromise] = React.useState<Promise<string> | null>(null);

	function reset(): void {
		setRunning(false);
	}

	function onClick(): void {
		setRunning(true);
		const p = timeout(promiseTimeout, resolveValue, rejectValue, shouldResolve);
		p.then(reset, reset);
		setPromise(p);
	}

	return (
		<>
			<p className="h2 text-mono">&lt;Async /&gt;</p>
			<div className="card">
				<table>
					<tbody>
						<tr>
							<td>Promise timeout (ms, 1000 by default)</td>
							<td>
								<input disabled={running} type="number" value={promiseTimeout} onChange={e => setPromiseTimeout(+(e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>Should resolve</td>
							<td>
								<input disabled={running} type="checkbox" checked={shouldResolve} onChange={e => setShouldResolve(!shouldResolve)} />
							</td>
						</tr>
						<tr>
							<td>Resolve value</td>
							<td>
								<input disabled={running} type="text" value={resolveValue} onChange={e => setResolveValue((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>Reject value</td>
							<td>
								<input disabled={running} type="text" value={rejectValue} onChange={e => setRejectValue((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>Children value (leave empty to render resolved value instead)</td>
							<td>
								<input disabled={running} type="text" value={childrenValue} onChange={e => setChildrenValue((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>Fallback value (leave empty to render rejected value instead)</td>
							<td>
								<input disabled={running} type="text" value={fallbackValue} onChange={e => setFallbackValue((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
						<tr>
							<td>Stub value</td>
							<td>
								<input disabled={running} type="text" value={stubValue} onChange={e => setStubValue((e.target as HTMLInputElement).value)} />
							</td>
						</tr>
					</tbody>
				</table>
				<button onClick={onClick} disabled={running}>Run!</button>
				{promise && (
					<Async promise={promise} fallback={fallbackValue ? (
						<div className="card-red">
							<p>Fallback:</p>
							{fallbackValue}
						</div>
					) : (v => (
						<div className="card-red">
							<p>Fallback:</p>
							{v}
						</div>
					))} stub={
						<div className="card-yellow">
							<p>Stub:</p>
							{stubValue}
						</div>
					}>{childrenValue ? (
						<div className="card-white">
							<p>Children:</p>
							{childrenValue}
						</div>
					) : (v => (
						<div className="card-white">
							<p>Children:</p>
							{v}
						</div>
					))}</Async>
				)}
			</div>
		</>
	);
}

function SwitchDemo(): JSX.Element {
	const [value, setValue] = React.useState<"First" | "Second" | "Third" | null>(null);
	return (
		<>
			<p className="h2 text-mono">&lt;Switch /&gt;, &lt;Case /&gt;, &lt;Default /&gt;</p>
			<div className="card">
				<label>
					<input type="radio" name="switch-demo" value="First" onChange={() => setValue("First")} />
					<span>First</span>
				</label>
				<br />
				<label>
					<input type="radio" name="switch-demo" value="Second" onChange={() => setValue("Second")} />
					<span>Second</span>
				</label>
				<br />
				<label>
					<input type="radio" name="switch-demo" value="Third" onChange={() => setValue("Third")} />
					<span>Third</span>
				</label>
				<br />
				<label>
					<input type="radio" name="switch-demo" value="None" defaultChecked={true} onChange={() => setValue(null)} />
					<span>None</span>
				</label>
				<br />
				<pre className="card-white">{`<Switch value="${value}">\n\t<Case value=\"First\">Selected value: First</Case>\n\t<Case value=\"Second\">Selected value: Second</Case>\n\t<Case value=\"Third\">Selected value: Third</Case>\n\t<Default>No values selected</Default>\n</Switch>`}</pre>
				<div className="card-white">
					<Switch value={value}>
						<Case value="First">Selected value: First</Case>
						<Case value="Second">Selected value: Second</Case>
						<Case value="Third">Selected value: Third</Case>
						<Default>No values selected</Default>
					</Switch>
				</div>
			</div>
		</>
	);
}

function IfDemo(): JSX.Element {
	const [state, setState] = React.useState<boolean>(true);
	return (
		<>
			<p className="h2 text-mono">&lt;If /&gt;, &lt;Then /&gt;, &lt;Else /&gt;</p>
			<div className="card">
				<label>
					<input type="checkbox" defaultChecked={state} onChange={() => setState(!state)} />
				</label>
				<br />
				<pre className="card-white">{`<If value={${state}}>\n\t<Then>Checked</Then>\n\t<Else>Unchecked</Else>\n</If>`}</pre>
				<div className="card-white">
					<If value={state}>
						<Then>Checked</Then>
						<Else>Unchecked</Else>
					</If>
				</div>
			</div>
		</>
	);
}

function ForeachDemo(): JSX.Element {
	const [count, setCount] = React.useState<number>(10);
	return (
		<>
			<p className="h2 text-mono">&lt;Foreach /&gt;</p>
			<div className="card">
				<table>
					<tbody>
						<tr>
							<td>Items count</td>
							<td>
								<input type="number" value={count} onChange={e => setCount(+e.target.value)} />
							</td>
						</tr>
					</tbody>
				</table>
				<pre className="card-white">{`<Foreach data={countryArray.slice(0, ${count})}>\n\t{(item, index) => (\n\t\t<p>item: {item}, index: {index}</p>\n\t)}\n</Foreach>`}</pre>
				<div className="card-white">
					<Foreach data={countryArray.slice(0, count)}>
						{(item, index) => (
							<p key={index}>item: {item}, index: {index}</p>
						)}
					</Foreach>
				</div>
			</div>
		</>
	);
}

function ForDemo(): JSX.Element {
	const [from, setFrom] = React.useState<number>(0);
	const [to, setTo] = React.useState<number>(10);
	return (
		<>
			<p className="h2 text-mono">&lt;For /&gt;</p>
			<div className="card">
				<table>
					<tbody>
						<tr>
							<td>From</td>
							<td>
								<input type="number" value={from} onChange={e => setFrom(+e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>To</td>
							<td>
								<input type="number" value={to} onChange={e => setTo(+e.target.value)} />
							</td>
						</tr>
					</tbody>
				</table>
				<pre className="card-white">{`<For from="${from}" to="${to}">\n\t{i => (\n\t\t<p>{i}</p>\n\t)}\n</For>`}</pre>
				<div className="card-white">
					<For from={from} to={to}>
						{i => (
							<p key={i}>{i}</p>
						)}
					</For>
				</div>
			</div>
		</>
	);
}

function SpinnerDemo(): JSX.Element {
	const [r, setR] = React.useState(50);
	const [strokeWidth, setStrokeWidth] = React.useState(1);
	const [strokeColor, setStrokeColor] = React.useState("#000000");
	const [bgStrokeColor, setBgStrokeColor] = React.useState("transparent");
	const [length, setLength] = React.useState(.5);
	const [duration, setDuration] = React.useState(1);
	const [clockwise, setClockwise] = React.useState(true);
	const [className, setClassName] = React.useState("");
	return (
		<>
			<p className="h2 text-mono">&lt;Spinner /&gt;</p>
			<div className="card">
				<table>
					<tbody>
						<tr>
							<td>r</td>
							<td>
								<input type="number" value={r} onChange={e => setR(+e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>strokeWidth</td>
							<td>
								<input type="number" value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>strokeColor</td>
							<td>
								<input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>bgStrokeColor</td>
							<td>
								<input type="color" value={bgStrokeColor} onChange={e => setBgStrokeColor(e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>length</td>
							<td>
								<input type="range" value={length} min="0" max="1" step="0.01" onChange={e => setLength(+e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>duration</td>
							<td>
								<input type="number" value={duration} onChange={e => setDuration(+e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>clockwise</td>
							<td>
								<input type="checkbox" checked={clockwise} onChange={() => setClockwise(!clockwise)} />
							</td>
						</tr>
						<tr>
							<td>className</td>
							<td>
								<input type="text" value={className} onChange={e => setClassName(e.target.value)} />
							</td>
						</tr>
					</tbody>
				</table>
				<div className="card-white">{`<Spinner r="${r}" strokeWidth="${strokeWidth}" strokeColor="${strokeColor}" length="${length}" duration="${duration}" direction="${clockwise}" className="${className}" />`}</div>
				<Spinner r={r} strokeWidth={strokeWidth} strokeColor={strokeColor} bgStrokeColor={bgStrokeColor} length={length} duration={duration} direction={clockwise ? "clockwise" : "counter-clockwise"} className={className} />
			</div>
		</>
	);
}

function timeout<T, U>(ms: number, resolveValue: T, rejectValue: U, resolve: boolean): Promise<T> {
	return new Promise<T>((rs, rj): void => void setTimeout((): void => resolve ? rs(resolveValue) : rj(rejectValue), ms));
}

import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "@stein197/react-ui/Dropdown";
import Async from "@stein197/react-ui/Async";
import {Switch, Case, Default} from "@stein197/react-ui/Switch";
import {If, Then, Else} from "@stein197/react-ui/If";
import Foreach from "@stein197/react-ui/Foreach";
import For from "@stein197/react-ui/For";
import Spinner from "@stein197/react-ui/Spinner";
import ComponentPlayground from "./src/view/ComponentPlayground";

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
			<ComponentPlayground name="Dropdown" component={Dropdown} props={{
				data: {
					type: "any",
					defaultValue: countryArray
				},
				name: {
					type: "string"
				},
				placeholder: {
					type: "string"
				},
				defaultValue: {
					type: "string"
				},
				className: {
					type: "string"
				}
			}} />
			<AsyncDemo />
			<ComponentPlayground name="Switch" component={Switch} props={{
				value: {
					type: "list",
					defaultValue: "None",
					data: [
						"First",
						"Second",
						"Third",
						"None"
					]
				}
			}} renderCode={(name, props) => `<${name} value="${props.value}">\n\t<Case value=\"First\">Selected value: First</Case>\n\t<Case value=\"Second\">Selected value: Second</Case>\n\t<Case value=\"Third\">Selected value: Third</Case>\n\t<Default>No values selected</Default>\n</Switch>`}>
				{props => (
					<Switch value={props.value}>
						<Case value="First">Selected value: First</Case>
						<Case value="Second">Selected value: Second</Case>
						<Case value="Third">Selected value: Third</Case>
						<Default>No values selected</Default>
					</Switch>
				)}
			</ComponentPlayground>
			<ComponentPlayground name="If" component={If} props={{
				value: {
					type: "boolean",
					defaultValue: true
				}
			}} renderCode={(name, props) => `<${name} value="${props.value}">\n\t<Then>Checked</Then>\n\t<Else>Unchecked</Else>\n</If>`}>
				{props => (
					<If value={props.value}>
						<Then>Checked</Then>
						<Else>Unchecked</Else>
					</If>
				)}
			</ComponentPlayground>
			<ForeachDemo />
			<ComponentPlayground name="For" component={For} props={{
				children: {
					type: "any",
					defaultValue: n => <p>{n}</p>
				},
				to: {
					type: "number",
					defaultValue: 10
				}
			}} renderCode={(name, props) => `<${name} from="${props.from}" to="${props.to}">\n\t{i => (\n\t\t<p>{i}</p>\n\t)}\n</${name}>`} />
			<ComponentPlayground name="Spinner" component={Spinner} props={{
				r: {
					type: "number",
					defaultValue: 50
				},
				strokeWidth: {
					type: "number",
					defaultValue: 1
				},
				strokeColor: {
					type: "color"
				},
				bgStrokeColor: {
					type: "color",
					defaultValue: "transparent"
				},
				length: {
					type: "range",
					min: 0,
					max: 1,
					step: .01
				},
				duration: {
					type: "range",
					min: 0,
					max: 10,
					step: .1
				}
			}} />
		</div>
	);
});

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

function timeout<T, U>(ms: number, resolveValue: T, rejectValue: U, resolve: boolean): Promise<T> {
	return new Promise<T>((rs, rj): void => void setTimeout((): void => resolve ? rs(resolveValue) : rj(rejectValue), ms));
}

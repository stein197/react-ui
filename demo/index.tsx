import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "../src/Dropdown";
import Async from "../src/Async";

const list: string[] = [
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
			<DropdownDemo />
			<AsyncDemo />
		</div>
	);
});

function DropdownDemo(): JSX.Element {
	const [name, setName] = React.useState<string>("country");
	const [enabled, setEnabled] = React.useState<boolean>(true);
	const [required, setRequired] = React.useState<boolean>(false);
	const [editable, setEditable] = React.useState<boolean>(true);
	const [placeholder, setPlaceholder] = React.useState<string>("Select a country");
	const [defaultValue, setDefaultValue] = React.useState<string>(list[0]);
	const [className, setClassName] = React.useState<string>("dropdown-country");
	const [eventValue, setEventValue] = React.useState<{value?: string; state?: string}>({});
	const onChange = React.useCallback((value: string, state: string): void => setEventValue({value, state}), []);

	return (
		<>
			<p className="h1">Demo &lt;Dropdown /&gt;</p>
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
				<Dropdown data={list} name={name} enabled={enabled} required={required} editable={editable} placeholder={placeholder} defaultValue={defaultValue} className={className} onChange={onChange} />
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
		// setPromise(null);
	}

	function onClick(): void {
		setPromise(null);
		queueMicrotask(() => {
			setRunning(true);
			const p = timeout(promiseTimeout, resolveValue, rejectValue, shouldResolve);
			p.then(reset, reset);
			setPromise(p);
		});
	}

	return (
		<>
			<p className="h1">Demo &lt;Async /&gt;</p>
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

function timeout<T, U>(ms: number, resolveValue: T, rejectValue: U, resolve: boolean): Promise<T> {
	return new Promise<T>((rs, rj): void => void setTimeout((): void => resolve ? rs(resolveValue) : rj(rejectValue), ms));
}

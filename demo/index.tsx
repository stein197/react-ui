import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "../src/Dropdown";

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
				<pre>{JSON.stringify(eventValue, undefined, "\t")}</pre>
				<Dropdown data={list} name={name} enabled={enabled} required={required} editable={editable} placeholder={placeholder} defaultValue={defaultValue} className={className} onChange={onChange} />
			</div>
		</>
	);
}

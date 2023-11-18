import cb from "./countryBorders.json";
export const countryCodeConversion = (data) => {
  return data.map((it) => {
    return {
      ...it,
      countries: it.countries.map(
        (country) =>
          countryCodeTocountries.find((dataum) => dataum.code === country)
            ?.name || "Unknown"
      ),
    };
  });
};

export const customLinkFormatter = (cell) => {
  const value = cell.getValue();
  return `<a href=https://www.arrow.com/en/${value
    .replace(/ /g, "-")
    .replace(/[A-Z]/g, (match) => match.toLowerCase())
    .replace(/,/g, "")} target="_blank">${value}</a>`;
};

const countryCodeTocountries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "American Samoa", code: "AS" },
  { name: "AndorrA", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguilla", code: "AI" },
  { name: "Antarctica", code: "AQ" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bermuda", code: "BM" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Bouvet Island", code: "BV" },
  { name: "Brazil", code: "BR" },
  { name: "British Indian Ocean Territory", code: "IO" },
  { name: "Brunei Darussalam", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Cape Verde", code: "CV" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Christmas Island", code: "CX" },
  { name: "Cocos (Keeling) Islands", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "The Democratic Republic of the Congo", code: "CD" },
  { name: "Cook Islands", code: "CK" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Ethiopia", code: "ET" },
  { name: "Falkland Islands (Malvinas)", code: "FK" },
  { name: "Faroe Islands", code: "FO" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "French Guiana", code: "GF" },
  { name: "French Polynesia", code: "PF" },
  { name: "French Southern Territories", code: "TF" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Greenland", code: "GL" },
  { name: "Grenada", code: "GD" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernsey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Heard Island and Mcdonald Islands", code: "HM" },
  { name: "Holy See (Vatican City State)", code: "VA" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran, Islamic Republic Of", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Isle of Man", code: "IM" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Republic of Korea", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libyan Arab Jamahiriya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "The Former Yugoslav Republic of Macedonia", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Martinique", code: "MQ" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mayotte", code: "YT" },
  { name: "Mexico", code: "MX" },
  { name: "Federated States of Micronesia", code: "FM" },
  { name: "Republic of Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montserrat", code: "MS" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "Netherlands Antilles", code: "AN" },
  { name: "New Caledonia", code: "NC" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue", code: "NU" },
  { name: "Norfolk Island", code: "NF" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestinian Territory", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Pitcairn", code: "PN" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reunion", code: "RE" },
  { name: "Romania", code: "RO" },
  { name: "Russian Federation", code: "RU" },
  { name: "RWANDA", code: "RW" },
  { name: "Saint Helena", code: "SH" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Pierre and Miquelon", code: "PM" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia and Montenegro", code: "CS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Svalbard and Jan Mayen", code: "SJ" },
  { name: "Swaziland", code: "SZ" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syrian Arab Republic", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "United Republic of Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Turks and Caicos Islands", code: "TC" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "United States Minor Outlying Islands", code: "UM" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Venezuela", code: "VE" },
  { name: "Viet Nam", code: "VN" },
  { name: "British Virgin Islands", code: "VG" },
  { name: "U.S.Virgin Islands", code: "VI" },
  { name: "Wallis and Futuna", code: "WF" },
  { name: "Western Sahara", code: "EH" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabw", code: "ZN" },
];

export const queryOneIconFormatter = (cell, formatterParams, onRendered) => {
  // Access the value from another cell (e.g., 'name' column)
  const rowValue = cell.getRow().getData();

  const title = `In the event of losing Austria as a supplier, ${rowValue.percentage}% of category ${rowValue.category} would be affected resulting in a loss of ${rowValue.count} parts.`;

  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  <circle fill="#2196F3" cx="24" cy="24" r="21"></circle>
  <rect x="22" y="22" fill="#fff" width="4" height="11"></rect>
  <circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle>
</svg>
`;
};

export const queryTwoIconFormatter = (cell, formatterParams, onRendered) => {
  // Access the value from another cell (e.g., 'name' column)
  const rowValue = cell.getRow().getData();

  const title = `In the event of loosing Austria as a supplier, countries ${rowValue.countries}  could serve as alternatives for the category ${rowValue.category} covering ${rowValue.percentage}% of the parts. (Cannot guarantee same parts)`;

  return `
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  <circle fill="#2196F3" cx="24" cy="24" r="21"></circle>
<rect x="22" y="22" fill="#fff" width="4" height="11"></rect>
<circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle>
</svg>`;
  //   return `
  // <div class="tooltip">
  // <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  // <circle fill="#2196F3" cx="24" cy="24" r="21"></circle>
  // <rect x="22" y="22" fill="#fff" width="4" height="11"></rect>
  // <circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle>
  // </svg>
  //   <div class="tooltip-text">
  //   <div class="MuiTooltip-tooltip MuiTooltip-tooltipPlacementBottom css-ja5taz-MuiTooltip-tooltip" style="opacity: 1; transform: none; transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 133ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"><p class="MuiTypography-root MuiTypography-body1 css-1mdftu-MuiTypography-root">Tooltip with HTML</p><em>And here's</em> <b>some</b> <u>amazing content</u>. It's very engaging. Right?</div>
  //   </div>
  // </div>

  // `;
};

export const queryThreeIconFormatter = (cell, formatterParams, onRendered) => {
  // Access the value from another cell (e.g., 'name' column)
  const rowValue = cell.getRow().getData();

  // const title = `${rowValue.countries} contribute about ${rowValue.percentage}% to the catogary ${rowValue.category}`
  const title = `The country ${rowValue.countries} owns ${rowValue.percentage}% of global production of ${rowValue.category} category.`

  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  <circle fill="#2196F3" cx="24" cy="24" r="21"></circle>
  <rect x="22" y="22" fill="#fff" width="4" height="11"></rect>
  <circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle>
</svg>
`;
};

export const queryFourIconFormatter = (cell, formatterParams, onRendered) => {
  // Access the value from another cell (e.g., 'name' column)
  const rowValue = cell.getRow().getData();

  // const title = `The countries ${rowValue.countries} create a part bottlect fo the category ${rowValue.category}.`
  const title = `
  The countries ${rowValue.countries} jointly own Y% of the category ${rowValue.category}. (Unknown means a part has no country of manufacturing listed.)`;

  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  <circle fill="#2196F3" cx="24" cy="24" r="21"></circle>
  <rect x="22" y="22" fill="#fff" width="4" height="11"></rect>
  <circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle>
</svg>
`;
};

export const queryFiveIconFormatter = (cell, formatterParams, onRendered) => {
  // Access the value from another cell (e.g., 'name' column)
  const rowValue = cell.getRow().getData();

  const title = `In the event of losing countries China & India as a supplier, ${rowValue.percentage}% of category ${rowValue.category} would be affected resulting in a loss of ${rowValue.count} parts.`;

  return `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
  <title>${title}</title>
  <circle fill="#2196F3" cx="24" cy="24" r="21"></circle>
  <rect x="22" y="22" fill="#fff" width="4" height="11"></rect>
  <circle fill="#fff" cx="24" cy="16.5" r="2.5"></circle>
</svg>
`;
};

export const countryBorders = () => {
  // {
  //   "country_code": "AD",
  //   "country_name": "Andorra",
  //   "country_border_code": "FR",
  //   "country_border_name": "France"
  // }
const jsonData =  cb.map((it) => {
    return {
      countriesArr: [it.country_name, it.country_border_name],
      countries: `${it.country_name} - ${it.country_border_name}`,
      countryCodes: [it.country_code, it.country_border_code],
    };
  });

// Convert JSON object to a JSON string
const jsonString = JSON.stringify(jsonData, null, 2); // The third parameter (2) is for indentation

// Create a Blob containing the JSON data
const blob = new Blob([jsonString], { type: 'application/json' });

// Create a download link
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(blob);
downloadLink.download = 'output.json'; // Specify the filename

// Append the link to the document
document.body.appendChild(downloadLink);

// Trigger the download
downloadLink.click();

// Remove the link from the document
document.body.removeChild(downloadLink);

};

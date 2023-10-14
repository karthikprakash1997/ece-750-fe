import { COUNTRY_DETAILS } from "./common";

export const countryCodeConversion = (data) => {
  return data.map((it) => {
    return {
      ...it,
      countries: it.countries.map(country=> COUNTRY_DETAILS.find((dataum) => dataum.alpha2 === country)?.country ||"Null")
    };
  });
};

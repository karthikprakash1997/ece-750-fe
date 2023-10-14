import { COUNTRY_DETAILS } from "./common";

export const countryCodeConversion = (data) => {
  return data.map((it) => {
    return {
      ...it,
      countries: it.countries.map(country=> countryCodeTocountries.find((dataum) => dataum.code === country)?.country ||"Null")
    };
  });
};

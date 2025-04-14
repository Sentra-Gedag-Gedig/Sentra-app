import { CountryApiResponse } from "../types/country";

export const fetchCountries = async (): Promise<CountryApiResponse[]> => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (!res.ok) throw new Error("Failed to fetch country");
  return res.json();
};

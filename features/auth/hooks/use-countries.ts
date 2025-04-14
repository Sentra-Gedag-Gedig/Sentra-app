import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/country";
import { CountryApiResponse, CountryData } from "../types/country";

export const useCountries = () => {
  return useQuery<CountryData[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await fetchCountries();
      return data.map((country: CountryApiResponse) => ({
        name: country.name.common,
        region: country.region,
        flag: country.flags.png,
        dialCode: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
      }));
    },
    refetchOnWindowFocus: false,
  });
};

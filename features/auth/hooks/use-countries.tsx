import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/country-services";
import { Country } from "../types/country";

type Props = {
  flag: string;
  dialCode: string;
  region: string;
};

export const useCountries = () => {
  return useQuery<Props[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await fetchCountries();
      return data.map((country: Country) => ({
        region: country.region,
        flag: country.flags.png,
        dialCode: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
      }));
    },
  });
};

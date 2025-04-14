export interface CountryApiResponse {
  flags: {
    png: string;
    svg?: string;
  };
  idd: {
    root: string;
    suffixes?: string[];
  };
  name: {
    common: string;
  };
  region: string;
}
export type CountrySelectProps = {
  onSelect: (code: string) => void;
};

export type CountryData = {
  flag: string;
  dialCode: string;
  region: string;
  name: string;
};

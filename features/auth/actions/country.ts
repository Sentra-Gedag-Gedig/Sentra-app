export async function updateSelectedCountry({
  country,
  onSelect,
}: {
  country: { flag: string; dialCode: string };
  onSelect: (dialCode: string) => void;
}): Promise<{ flag: string; dialCode: string } | null> {
  if (country) {
    onSelect(country.dialCode);
  }
  return country;
}

export async function handleSelectedCountry({
  country,
  onSelect,
}: {
  country: { flag: string; dialCode: string };
  onSelect: (dialCode: string) => void;
}): Promise<{
  selected: { flag: string; dialCode: string };
  shouldCloseModal: boolean;
}> {
  await updateSelectedCountry({ country, onSelect });
  return {
    selected: country,
    shouldCloseModal: true,
  };
}

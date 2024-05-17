import usePlacesAutocomplete from "use-places-autocomplete";

const PlacesAutocomplete = ({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "se" },

    },
    debounce: 300,
    cache: 24 * 60 * 60,
    cacheKey: "region-restricted",
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className="hidden md:block absolute top-24 z-10 w-1/3 right-1/3">
      <input
        className="w-full p-3 rounded-full border border-slate-900"
        value={value}
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Sök efter en plats..."
      />

      {status === "OK" && <ul className="bg-white w-11/12 mx-auto p-2 rounded-b-sm">{renderSuggestions()}</ul>}
    </div>
  );
};

export default PlacesAutocomplete;

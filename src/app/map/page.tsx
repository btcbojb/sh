"use client";

import PlacesAutocomplete from "@/components/autocomplete";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  type Libraries,
} from "@react-google-maps/api";
import { useCallback, useMemo, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { mapStyle } from "./mapStyle";

interface Place {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
}
const libraries: Libraries = ["places"];

export default function Home() {
  const [lat, setLat] = useState<number>(57.721);
  const [lng, setLng] = useState<number>(12.9398);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  const pinPoint = useMemo(() => ({ lat: 57.724577, lng: 12.948083 }), []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      fullscreenControl: false,
      streetViewControl: false,
      minZoom: 13,
      clickableIcons: true,
      scrollwheel: false,
      mapTypeControl: false,
      styles: mapStyle,
    }),
    []
  );

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if ("placeId" in event) {
        const placeId = (event as google.maps.IconMouseEvent).placeId;
        if (placeId) {
          event.stop();

          const service = new google.maps.places.PlacesService(map!);

          service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              setSelectedPlace({
                name: place.name || "",
                position: {
                  lat: place.geometry!.location!.lat(),
                  lng: place.geometry!.location!.lng(),
                },
                // Add any other details you need from the place object
              });
            } else {
              console.error("Place details request failed:", status);
            }
          });
        }
      }
    },
    [map]
  );

  const handleCloseClick = () => {
    setSelectedPlace(null);
  };

  return (
    <div>

      <PlacesAutocomplete
        onAddressSelect={(address: string) => {
          getGeocode({ address: address }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            setLat(lat);
            setLng(lng);
          });
        }}
      />
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={mapCenter}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        onLoad={(map) => setMap(map)}
        onClick={handleMapClick}
      >
        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.position}
            onCloseClick={handleCloseClick}
          >
            <div className="w-96 p-4">
              <img
                src={selectedPlace.photo}
                className="w-full h-20 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">
                {selectedPlace.name}
              </h2>
              <div className="flex gap-4 mb-4 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Accessibility key={i} className="w-4 h-4" />
                ))}
              </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
    </LoadScript >
  );
}

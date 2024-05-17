"use client";

import { neon } from "@neondatabase/serverless";
import {
  GoogleMap,
  InfoWindow,
  useJsApiLoader,
  type Libraries,
} from "@react-google-maps/api";
import { drizzle } from "drizzle-orm/neon-http/driver";
import { Accessibility } from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { mapStyle } from "./mapStyle";

import PlacesAutocomplete from "@/components/autocomplete";
import { buttonVariants } from "@/components/ui/button";
import { placeTable } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import React from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
interface Place {
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  photo: string;
  websiteUrl: string;
  placeId: string;
}
const libraries: Libraries = ["places"];

function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: libraries,
  });
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [lat, setLat] = useState<number>(57.721);
  const [lng, setLng] = useState<number>(12.9398);

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
      styles: mapStyle,
    }),
    []
  );

  const handleMapClick = useCallback(
    async (event: google.maps.MapMouseEvent) => {
      if ("placeId" in event) {
        const placeId = (event as google.maps.IconMouseEvent).placeId;
        if (placeId) {
          event.stop();

          const service = new google.maps.places.PlacesService(map!);

          console.log(service);

          const getPlaceDetails = () =>
            new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
              service.getDetails({ placeId: placeId }, (place, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  place
                ) {
                  resolve(place);
                } else {
                  reject(`Place details request failed: ${status}`);
                }
              });
            });

          try {
            const place = await getPlaceDetails();

            setSelectedPlace({
              name: place.name || "",
              position: {
                lat: place.geometry!.location!.lat(),
                lng: place.geometry!.location!.lng(),
              },
              photo: place?.photos?.[0].getUrl() || "",
              websiteUrl: place.website || "",
              placeId: place.place_id || "",
            });

            if (!place) {
              throw new Error("Place details request failed");
            }

            const sql = neon(process.env.DATABASE_URL!);
            const db = drizzle(sql);

            const placeInDb = await db
              .select()
              .from(placeTable)
              .where(eq(placeTable.placeId, place.place_id || ""));

            if (placeInDb.length >= 1) {
              return;
            }

            await db.insert(placeTable).values({
              name: place.name || "",
              placeId: placeId,
              // website: "random",
              // lat: place.geometry!.location!.lat().toString(),
              // lng: place.geometry!.location!.lng().toString(),
              // photo: place?.photos?.[0].getUrl() || "",
              wheelchair: 0,
              perfume: 0,
              volume: 0,
              languages: 0,
              elevationDifference: 0,
              nuts: 0,
              auditoryLoop: 0,
              signLanguage: 0,
              smoke: 0,
              dogFriendly: 0,
              carpet: 0,
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    [map]
  );

  const handleCloseClick = () => {
    setSelectedPlace(null);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20">
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
        mapContainerStyle={{ width: "100%", height: "600px" }}
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

              <div className="flex gap-2">
                <Link
                  href={`/map/${selectedPlace.placeId}`}
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" })
                  )}
                >
                  Check out the place
                </Link>
                <Link
                  href={selectedPlace.websiteUrl}
                  target="__blank"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  Website
                </Link>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default React.memo(Home);

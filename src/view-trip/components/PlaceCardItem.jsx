import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const data = {
    textQuery: place?.placeName,
  };

  const GetPlacePhoto = async () => {
    const result = await GetPlaceDetails(data).then((res) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[0].name,
      );
      setPhoto(PhotoUrl);
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-md">
        <img
          src={photo ? photo : "/placePlaceholder.jpg"}
          className="h-[130px] w-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-500">{place.placeDetails}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const data = {
    textQuery: hotel?.hotelName,
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
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-110 transition-all cursor-pointer">
        <img
          src={photo ? photo : "/hotelPlaceholder.jpg"}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="flex flex-col gap-2 my-2">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💵 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;

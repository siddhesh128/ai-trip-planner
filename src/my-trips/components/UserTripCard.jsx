import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const data = {
    textQuery: trip?.userSelection?.location?.label,
  };

  const GetPlacePhoto = async () => {
    const result = await GetPlaceDetails(data).then((res) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        res.data.places[0].photos[3].name,
      );
      setPhoto(PhotoUrl);
    });
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="cursor-pointer hover:scale-105 transition-all">
        <img
          src={photo ? photo : "/placeholder.png"}
          className="h-[220px] w-[360px] object-cover rounded-xl"
        />

        <div>
          <h2 className="font-bold text-xl mt-3">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;

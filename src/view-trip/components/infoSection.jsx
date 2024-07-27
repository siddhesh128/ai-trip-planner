import { Button } from "@/components/ui/button";
import { PHOTO_REF_URL } from "@/constants/options";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { toast } from "sonner";

function InfoSection({ trip }) {
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

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/view-trip/${trip?.id}`)
      .then(() => toast.success("Link Copied"));
  };

  return (
    <div>
      <img
        src={photo ? photo : "/placeholder.png"}
        alt="Place Photo"
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              🥂 No. of Travellers: {trip?.userSelection?.travelers}
            </h2>
          </div>
        </div>
        <Button onClick={onCopyLink}>
          <CiShare1 />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;

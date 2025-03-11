"use client";

import { useEffect, useState } from "react";
import { SlLocationPin } from "react-icons/sl";

const UserLocation = () => {
  const [location, setLocation] = useState("Loading...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) =>
            setLocation(data.principalSubdivision || "Unknown location")
          )
          .catch(() => setLocation("Unknown location"));
      });
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <div className="headerItem hidden xl:inline-flex gap-1">
      <SlLocationPin className="text-lg text-white" />
      <div className="text-xs">
        <p>Deliver to</p>
        <p className="text-white font-bold uppercase">{location}</p>
      </div>
    </div>
  );
};

export default UserLocation;

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptinDetails from "../components/CaptinDetails";
import useGetCaption from "../hooks/useGetCaption";

export const CaptionHome = () => {
  useGetCaption();
  const ridePopupPanelRef = useRef(null);
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          className="w-16"
        />
        <Link
          to="/captain-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptinDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        {/* ridepopUp */}
      </div>
    </div>
  );
};

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptinDetails from "../components/CaptinDetails";
import useGetCaption from "../hooks/useGetCaption";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";
import { useSelector } from "react-redux";
import axios from "axios";
export const CaptionHome = () => {
  useGetCaption();
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { caption } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socketio);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  console.log("caption", caption);
  useEffect(() => {
    socket?.emit("join", { userType: "caption", userId: caption._id });

    const updateLocation = () => {
      console.log("updating location");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          };
          socket?.emit("update-location-captain", {
            userId: caption._id,
            location,
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);

    // check if the user has allowed location access
    // locationInterval();

    return () => clearInterval(locationInterval);
  }, [caption]);

  socket?.on("new-ride", (ride) => {
    setRide(ride);
    setRidePopupPanel(true);
  });
  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else if (!ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else if (!confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );
  console.log("ride", ride);
  const confirmRide = async () => {
    const res = await axios.post(
      `${BASE_URL}/rides/comfirm-ride`,
      {
        rideId: ride._id,
        captainId: caption._id,
      },
      {
        withCredentials: true,
      }
    );
    if (res.data.success) {
      setConfirmRidePopupPanel(true);
      setRidePopupPanel(false);
    }
  };
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
        {/* tempory button */}
        <button onClick={() => setRidePopupPanel(true)}>
          see avaliable rides
        </button>
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        {/* ridepopUp */}
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        {/* confirm Ride */}
        <ConfirmRidePopUpPanel
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

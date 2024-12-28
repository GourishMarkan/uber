import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaptinDetails from "../components/CaptinDetails";
import useGetCaption from "../hooks/useGetCaption";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";

export const CaptionHome = () => {
  // useGetCaption();
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  // to open and close ride popup
  // useGSAP(
  //   function () {
  //     if (ridePopupPanel) {

  //       gsap.to(ridePopupPanelRef.current, {
  //         transform: "translateY(0)",
  //       });
  //     } else {

  //       gsap.to(ridePopupPanelRef.current, {
  //         transform: "translateY(100)%",
  //       });
  //     }
  //   },
  //   [ridePopupPanel]
  // );
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

  // to open and close confirm ride popup
  // useGSAP(
  //   function () {
  //     if (confirmRidePopupPanel) {
  //       gsap.to(confirmRidePopupPanelRef.current, {
  //         transform: "translateY(0)",
  //       });
  //     } else if (!confirmRidePopupPanel) {
  //       gsap.to(confirmRidePopupPanelRef.current, {
  //         transform: "translateY(100%)",
  //       });
  //     }
  //   },
  //   [confirmRidePopupPanel]
  // );
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
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        {/* confirm Ride */}
        <ConfirmRidePopUpPanel
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

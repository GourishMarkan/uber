import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const CaptainRiding = () => {
  const [finishRidePanel, setFinalRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  return (
    <div className="h-screen relative flex flex-col justify-end">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          className="w-16"
        />
        <Link
          to="/captain-home"
          className="w-10 h-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
        onClick={() => {
          setFinalRidePanel(true);
        }}
      >
        <h5 className="p-1 text-center w-[90%] absolute top-0">
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">{"4 KM away"}</h4>
        <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainRiding;

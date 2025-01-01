// import React from 'react'
import PropTypes from "prop-types";
const LocationSearchPanel = ({
  suggestions,

  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") setPickup(suggestion);
    else if (activeField === "destination") setDestination(suggestion);
    // setPanelOpen(false);
    // setVehiclePanel(true);
  };
  console.log(suggestions);
  console.log("activeField", activeField);
  return (
    <div>
      {suggestions.map((elem, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border-2 p-3 border-gray-500 active:border-black
          rounded-xl items-center my-2 justify-start 
        "
        >
          <h2 className="bg-gray-200 h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>

          <p className="font-medium">{elem}</p>
          {/* <h4 className="font-medium">suggestion</h4> */}
        </div>
      ))}
    </div>
  );
};
LocationSearchPanel.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setVehiclePanel: PropTypes.func.isRequired,
  setPanelOpen: PropTypes.func.isRequired,
  setPickup: PropTypes.func.isRequired,
  setDestination: PropTypes.func.isRequired,
  activeField: PropTypes.string.isRequired,
};
export default LocationSearchPanel;

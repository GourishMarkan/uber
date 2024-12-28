import { useSelector } from "react-redux";

const CaptinDetails = () => {
  const { caption } = useSelector((state) => state.user);
  // console.log(caption);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          {/* image of driver */}
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
          />
          <h4 className="text-lg font-medium capitalize">
            {caption?.fullName?.firstName + " " + caption?.fullName?.lastName}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">{caption?.earning}</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl jusitfy-center gap-5 items-center">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          {/* total online hours of day */}
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gary-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          {/* TODO:check here what will come total online hours of day */}
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gary-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          {/*TODO:check here what will come total online hours of day */}
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gary-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptinDetails;

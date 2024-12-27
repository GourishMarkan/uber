import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CaptionProtected = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["token"]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("cookies", cookies.token);
    if (!cookies.token) {
      toast.error("You are not authorized to access this page");
      navigate("/captionLogin");
    }
  }, [cookies.token, navigate]);

  return <>{children}</>;
};

export default CaptionProtected;

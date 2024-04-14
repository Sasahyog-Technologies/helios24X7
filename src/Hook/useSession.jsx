import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";

// Set cookie to expire in 7 days
const expirationDate = addDays(new Date(), 7);
export const useSession = () => {
  const [cookies, setCookie] = useCookies(["encodedData"]);
  const navigate = useNavigate();

  const setUserInfoToCookies = (user) => {
    const encodedData = encodeURIComponent(JSON.stringify(user));
    setCookie("userSession", encodedData, {
      path: "/",
      expires: expirationDate,
    });
  };

  const getUserDataToCookie = () => {
    const encodedData = cookies.userSession;
    if (encodedData) {
      // Decode the retrieved encoded data
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      return decodedData;
    }
    return null;
  };

  const logoutHandler = () => {
    setCookie("userSession", null, { path: "/", expires: expirationDate });
    navigate("/");
  };
  return { setUserInfoToCookies, getUserDataToCookie, logoutHandler };
};

import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const [cookies, setCookie] = useCookies(["encodedData"]);
  const navigate = useNavigate();

  const setUserInfoToCookies = (user) => {
    const encodedData = encodeURIComponent(JSON.stringify(user));
    setCookie("userSession", encodedData, { path: "/" });
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
    setCookie("userSession", null, { path: "/" });
    navigate("/");

  };
  return { setUserInfoToCookies, getUserDataToCookie,logoutHandler };
};

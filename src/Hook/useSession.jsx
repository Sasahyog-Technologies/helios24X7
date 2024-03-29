import { useState } from "react";
import { useCookies } from "react-cookie";

export const useSession = () => {
  const [cookies, setCookie] = useCookies(["encodedData"]);

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
  return { setUserInfoToCookies, getUserDataToCookie };
};

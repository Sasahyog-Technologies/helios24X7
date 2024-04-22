import { useState } from "react";
import { useSession } from "./useSession";

const useOwnerManager = () => {
  const { getUserDataToCookie } = useSession();
  const loggedInUser = getUserDataToCookie()?.user;
  const isOwnerManager =
    loggedInUser?.type === "owner" || loggedInUser?.type === "manager";
  const isOwner = loggedInUser?.type === "owner";
 
  return { isOwnerManager, isOwner };
};

export default useOwnerManager;

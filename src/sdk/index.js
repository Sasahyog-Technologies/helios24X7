import axios from "axios";
export const BASEURL =
  "https://helios24x7backend-production.up.railway.app/api";
const strapii = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  },
});

export default strapii;

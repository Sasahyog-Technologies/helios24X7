import axios from "axios";
const STRAPI_URL = "https://helios24x7backend-production.up.railway.app";
const strapiAxios = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  },
});
export { strapiAxios };

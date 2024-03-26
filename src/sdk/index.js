import axios from "axios";
export const BASEURL =
  "https://helios24x7backend-production.up.railway.app/api";
const strapiAxios = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
     Authorization: "Bearer " + process.env.REACT_APP_STRAPI_TOKEN,
  },
});

export default strapiAxios;

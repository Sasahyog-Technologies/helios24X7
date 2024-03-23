import Strapi from "strapi-sdk-js";
const strapi = new Strapi({
 
  url: "https://helios24x7backend-production.up.railway.app",
  prefix: "/api",
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${localStorage.getItem("strapi_jwt")}`, currently not working
    },
  },
});
export default strapi;

import axios from "axios";
export const BASEURL =
  "https://helios24x7backend-production.up.railway.app/api";

const strapiAxios = axios.create({
  baseURL: BASEURL,
  headers: {
    //"Content-Type": "application/json",
    Authorization:
      "Bearer 84d665fecd25924377527b0c532ec5bfa4fc48c717ae6607960588c15fcaa7af9f79df341227f056c01f3a1aed38acf46235f4949c708a6b9a3ff8b9897f5b172e9e896446158da862794580fd27a8ea615bda11fa69939912a2eea5c5429ec068100a2107975636e18d97dc2b1ba5e26c05f5b2aab7114c76bdc06bb89e614f",
  },
});

export default strapiAxios;

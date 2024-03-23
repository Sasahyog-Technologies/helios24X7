import QueryString from "qs";
import strapii from "./index";
import { routes } from "./routes.js";

const queryStringConfig = {
  encodeValuesOnly: true,
};

const sanitizeQuery = (query) => {
  return QueryString.stringify(query, queryStringConfig);
};

const findOne = async (route, id, query) => {
  const routePath = routes[route];
  const sanitizedQuery = sanitizeQuery(query ?? "");
  const response = await strapii.get(`${routePath}/${id}?${sanitizedQuery}`);
  return response.data;
};

const findMany = async (route, query) => {
  const routePath = routes[route];
  const sanitizedQuery = sanitizeQuery(query ?? "");
  const response = await strapii.get(`${routePath}?${sanitizedQuery}`);
  return response.data;
};

const update = async (route, id, data) => {
  const routePath = routes[route];
  const response = await strapii.put(`${routePath}/${id}`, data);
  return response.data;
};

const create = async (route, data) => {
  const routePath = routes[route];
  const response = await strapii.post(routePath, data);
  return response.data;
};

const remove = async (route, id) => {
  const routePath = routes[route];
  const response = await strapii.delete(`${routePath}/${id}`);
  return response.data;
};

const request = {
  findOne,
  findMany,
  update,
  create,
  remove,
};

export default request;

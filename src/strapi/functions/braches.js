import strapi from "../index";

export async function getBranches() {
  try {
    const response = await strapi.find("/branches", {});
    return response;
  } catch (err) {
    console.error(err);
  }
}

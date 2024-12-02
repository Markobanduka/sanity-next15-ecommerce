import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
      _type == "product"
       && name match $SearchParam 
    ] | order(name asc)
    `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        SearchParam: `*${searchParam}*`,
      },
    });
    return products.data || [];
  } catch (error) {
    console.error("Failed to fetch products by name", error);
    return [];
  }
};

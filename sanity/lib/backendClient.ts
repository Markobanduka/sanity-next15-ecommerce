import { projectId, dataset, apiVersion } from "../env";
import { createClient } from "next-sanity";

export const backend = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Enable CDN for static content
  token: process.env.SANITY_API_TOKEN,
});

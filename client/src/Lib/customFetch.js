import axios from "axios";
import { baseUrl } from "./constants";

export default async function customFetch(url, method, data, headers) {
    try {
      const response = await axios({
        method,
        url: `${baseUrl}/${url}`,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
        console.error("Error: ", error);
        throw new Error("Failed to fetch data. Please try again.");
    }
}
import axios from "axios";
import { baseUrl } from "./constants";

export default async function customFetch(url, method, data, headers) {
    try {
      const response = await axios({
        method,
        url: `${baseUrl}/${url}`,
        data: method === "GET" ? undefined : data,
        params: method === "GET" ? data : undefined,
        headers,
      });
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
        console.error("Error: ", error);
        throw new Error("Failed to fetch data. Please try again.");
    }
}
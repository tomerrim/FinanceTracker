import axios from "axios";
import { baseUrl } from "./constants";

export default async function customFetch(url, method, data) {
    const response = await axios({
        method,
        url: `${baseUrl}/${url}`,
        data
    });
    return response.data;
}
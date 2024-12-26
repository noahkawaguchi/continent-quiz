import axios from "axios";

const BASE_URL: string = 'https://restcountries.com/v3.1';

export const fetchAPIData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.statusText || error.message}`);
    } else {
      throw new Error(`Unexpected Error: ${error}`);
    }
  }
}

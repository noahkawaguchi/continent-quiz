const BASE_URL: string = 'https://restcountries.com/v3.1/alpha';

export const fetchAPIData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

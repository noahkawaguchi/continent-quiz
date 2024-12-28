import { useState, useEffect } from "react";
import axios from "axios";

const URL: string = 'https://restcountries.com/v3.1/all?fields=cca2';

/**
 * Fetches all valid CCA2 codes from the REST Countries API after the component is first mounted.
 * @returns `{ data, loading, error }` - `data` is an array of the codes.
 */
export const useAllValidCCA2 = () => {
  const [data, setData] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await axios.get(URL);
        const processedData = Object.values(rawData.data).map((item: any) => item.cca2);
        setData(processedData);
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Use [] so this only runs once

  return { data, loading, error };
};

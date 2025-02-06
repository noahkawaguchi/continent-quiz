import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL: string = 'https://restcountries.com/v3.1/alpha';

interface ResponseInfo {
  name: { common: string };
  flag: string;
  continents: string[];
}

interface RegionInfo {
  commonName: string;
  flagEmoji: string;
  continents: Array<string>;
}

/**
 * Fetches common name, flag emoji, and continents data from the Rest Countries API
 * for the specified country or region when cca2 changes.
 * @param cca2 - The two-character code representing the region.
 * @returns
 *    - `{ data, loading, error }`
 *    - `data` contains `.commonName`, `.flagEmoji`, and `.continents`.
 */
export const useProcessedRegionData = (cca2: string) => {
  const [data, setData] = useState<RegionInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const rawData = await axios.get<ResponseInfo>(`${BASE_URL}/${cca2}`);
        const processedData: RegionInfo = Object.values(rawData.data).map(
          (item: ResponseInfo) => ({
            commonName: item.name.common,
            flagEmoji: item.flag,
            continents: item.continents,
          })
        )[0];
        setData(processedData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchAndProcessData();
  }, [cca2]);

  return { data, loading, error };
};

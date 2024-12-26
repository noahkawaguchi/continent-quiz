import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL: string = 'https://restcountries.com/v3.1/alpha';

interface ResponseInfo {
  name: { common: string},
  capital: string,
  flag: string,
  continents: string,
}

interface RegionInfo {
  commonName: string,
  capitals: Array<string>,
  flagEmoji: string,
  continents: Array<string>,
}

export const useProcessedData = (cca2: string) => {
  const [data, setData] = useState<RegionInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const rawData = await axios.get<ResponseInfo>(`${BASE_URL}/${cca2}`);
        const processedData: RegionInfo = Object.values(rawData.data).map((item: any) => ({
          commonName: item.name.common,
          capitals: item.capital,
          flagEmoji: item.flag,
          continents: item.continents
        }))[0];
        setData(processedData);
      } catch (err: any) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchAndProcessData();
  }, [cca2]);

  return { data, loading, error };
}

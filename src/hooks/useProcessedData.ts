import { useState, useEffect } from "react";
import { fetchAPIData } from "../services/api";

export const useProcessedData = (cca2: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const rawData = await fetchAPIData(`alpha/${cca2}`);
        const processedData = rawData.map((item: any) => ({

          // TODO
          commonName: item.name.common,
          capitals: item.capital,
          flagEmoji: item.flag,
          continents: item.continents

        }));
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

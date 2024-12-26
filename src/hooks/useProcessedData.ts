import { useState, useEffect } from "react";
import { fetchAPIData } from "../services/api";

export const useProcessedData = (endpoint: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      try {
        const rawData = await fetchAPIData(endpoint);
        const processedData = rawData.map((item: any) => ({

          // TODO
          name: item.name.common

        }));
        setData(processedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAndProcessData();
  }, [endpoint]);
  
  return { data, loading, error };
}

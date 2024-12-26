import { useState, useEffect } from "react";
import { fetchAPIData } from "../services/api";

export const useFetchAllCCA2 = () => {
  const [cca2data, setData] = useState<any>(null);
  const [cca2loading, setLoading] = useState<boolean>(true);
  const [cca2error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchAPIData('all?fields=cca2');
        const processedData = Object.values(rawData).map((item: any) => item.cca2);
        setData(processedData);
      } catch (err: any) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Use [] so this only runs once

  return { cca2data, cca2loading, cca2error };
}

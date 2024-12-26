import React from "react";
import { useFetchAllCCA2 } from "../hooks/useFetchAllCCA2";
import { useProcessedData } from "../hooks/useProcessedData";

const Question: React.FC = () => {
  const { cca2data, cca2loading, cca2error } = useFetchAllCCA2();
  const { data, loading, error } = useProcessedData('mo');

  if (cca2loading) return <p>Loading...</p>;
  if (loading) return <p>Loading...</p>;
  if (cca2error) return <p>Error: {cca2error}</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <pre style={{textAlign: 'left'}}>{JSON.stringify(cca2data, null, 2)}</pre>
      <pre style={{textAlign: 'left'}}>{JSON.stringify(data, null, 2)}</pre>
    </>
  );  
}

export default Question;

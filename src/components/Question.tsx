import React from "react";
import { useProcessedData } from "../hooks/useProcessedData";

interface QuestionProps {
  cca2: string
}

const Question: React.FC<QuestionProps> = ({ cca2 }) => {
  const { data, loading, error } = useProcessedData(cca2);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="question">
      <p>Where is...</p>
      <h3>{data?.commonName} {data?.flagEmoji}</h3>
      <div className="buttons">
        <button>Africa</button>
        <button>Antarctica</button>
        <button>Asia</button>
        <button>Europe</button>
        <button>North America/Caribbean</button>
        <button>Australia/Oceania</button>
        <button>South America</button>
      </div>
      <pre style={{textAlign: 'left'}}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );  
}

export default Question;

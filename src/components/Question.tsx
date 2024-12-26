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
    <>
      {/* <pre style={{textAlign: 'left'}}>{JSON.stringify(cca2data, null, 2)}</pre> */}
      <pre style={{textAlign: 'left'}}>{JSON.stringify(data, null, 2)}</pre>
    </>
  );  
}

export default Question;

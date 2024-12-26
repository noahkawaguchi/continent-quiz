import { useProcessedData } from "../hooks/useProcessedData";

const Question = () => {
  const { data, loading, error } = useProcessedData('ca');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default Question;

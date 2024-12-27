import React from "react";
import { useState } from "react";
import { useProcessedData } from "../hooks/useProcessedData";

interface QuestionProps {
  cca2: string,
  correctAnswer: Function
}

enum Continents {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  North_America = 'North America',
  Oceania = 'Oceania',
  South_America = 'South America',
}

const Question: React.FC<QuestionProps> = ({ cca2, correctAnswer }) => {
  const [questionResult, setQuestionResult] = useState('');

  const { data, loading, error } = useProcessedData(cca2);

  const gradeAnswer = (answer: Continents): void => {
    if (data?.continents.includes(answer)) {
      setQuestionResult('Correct!');
      correctAnswer(true);
      return;
    }
    setQuestionResult(`Incorrect. Correct answers for ${data?.commonName} include: ${data?.continents}.`)
    correctAnswer(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="question">
      <p>Where is... <strong>{data?.commonName}</strong> {data?.flagEmoji}</p>
      <div className="buttons-and-result">
        <div className="buttons-outer">
          <div className="buttons-inner">
            <button onClick={() => gradeAnswer(Continents.Africa)}>Africa</button>
            <button onClick={() => gradeAnswer(Continents.Antarctica)}>Antarctica</button>
            <button onClick={() => gradeAnswer(Continents.Asia)}>Asia</button>
            <button onClick={() => gradeAnswer(Continents.Europe)}>Europe</button>
            <button onClick={() => gradeAnswer(Continents.North_America)}>
              North America <i>(including Central<br/>America and the Caribbean)</i>
            </button>
            <button onClick={() => gradeAnswer(Continents.Oceania)}>Oceania</button>
            <button onClick={() => gradeAnswer(Continents.South_America)}>South America</button>
          </div>
        </div>
        <p>{questionResult}</p>
      </div>
      {/* <pre style={{textAlign: 'left'}}>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );  
}

export default Question;

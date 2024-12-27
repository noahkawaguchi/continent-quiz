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
    setQuestionResult(`Incorrect. Correct answers include: ${data?.continents}.`)
    correctAnswer(false);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="question">
      <p>Where is...</p>
      <h3>{data?.commonName} {data?.flagEmoji}</h3>
      <div className="buttons">
        <button onClick={() => {gradeAnswer(Continents.Africa)}}>Africa</button>
        <button onClick={() => {gradeAnswer(Continents.Antarctica)}}>Antarctica</button>
        <button onClick={() => {gradeAnswer(Continents.Asia)}}>Asia</button>
        <button onClick={() => {gradeAnswer(Continents.Europe)}}>Europe</button>
        <button onClick={() => {gradeAnswer(Continents.North_America)}}>North America/Caribbean</button>
        <button onClick={() => {gradeAnswer(Continents.Oceania)}}>Australia/Oceania</button>
        <button onClick={() => {gradeAnswer(Continents.South_America)}}>South America</button>
      </div>
      <p>{questionResult}</p>
      {/* <pre style={{textAlign: 'left'}}>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );  
}

export default Question;

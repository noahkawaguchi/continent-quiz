import React from "react";
import { useState } from "react";
import { useProcessedRegionData } from "../../hooks/useProcessedRegionData";

interface QuestionProps {
  cca2: string,
  isAnswerCorrect: Function
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

/**
 * Displays a question asking for a country or region's continent and grades the answer.
 * @param cca2 - Two-character code representing the country or region.
 * @param isAnswerCorrect - Function that takes whether the answer was correct or incorrect.
 * @returns A set of buttons with surrounding paragraphs and labels.
 */
const Question: React.FC<QuestionProps> = ({ cca2, isAnswerCorrect }): React.JSX.Element => {
  const [questionResult, setQuestionResult] = useState(<></>);

  const { data, loading, error } = useProcessedRegionData(cca2);

  const gradeAnswer = (answer: Continents): void => {
    if (data?.continents.includes(answer)) {
      setQuestionResult(<span style={{color: "limegreen"}}>Correct!</span>);
      isAnswerCorrect(true);
      return;
    }
    setQuestionResult(
      <span style={{color: "crimson"}}>
        Incorrect. Correct answers for {data?.commonName} include: {data?.continents}.
      </span>
    );
    isAnswerCorrect(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="question">
      <p>Where is... <strong>{data?.commonName}</strong> {data?.flagEmoji}</p>
      <div className="buttons-and-result">
        <div className="buttons-outer">
          <div className="buttons-inner">
            <button id="NAButton" onClick={() => gradeAnswer(Continents.North_America)}>
              North<br/>America*
            </button>
            <button onClick={() => gradeAnswer(Continents.South_America)}>
              South<br/>America
            </button>
            <button onClick={() => gradeAnswer(Continents.Antarctica)}>Antarctica</button>
          </div>
          <div className="buttons-inner">
            <button onClick={() => gradeAnswer(Continents.Europe)}>Europe</button>
            <button onClick={() => gradeAnswer(Continents.Asia)}>Asia</button>
            <button onClick={() => gradeAnswer(Continents.Africa)}>Africa</button>
            <button onClick={() => gradeAnswer(Continents.Oceania)}>Oceania</button>
          </div>
        </div>
        <label htmlFor="NAButton" className="footnote">
          *including Central America and the Caribbean
        </label>
        <p>{questionResult}</p>
      </div>
    </div>
  );  
};

export default Question;

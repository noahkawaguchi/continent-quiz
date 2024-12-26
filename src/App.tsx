import './App.css'
import { useState, useEffect } from 'react';
import Header from './components/Header'
import Question from './components/Question'
import { useFetchAllCCA2 } from "./hooks/useFetchAllCCA2";
import { Utils } from './utils/Utils';

function App() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(score)
  }, [score]);

  const correctAnswer = (correct: boolean) => {
    console.log(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
  }
  
  // Get all valid CCA2 codes only once
  const { cca2data, cca2loading, cca2error } = useFetchAllCCA2();
  if (cca2loading) return <p>Loading...</p>;
  if (cca2error) return <p>Error: {cca2error}</p>;
  const randomCCA2: string = Utils.randomCCA2(cca2data!);

  return (
    <>
      <header><Header /></header>
      <main>
        <Question cca2={randomCCA2} correctAnswer={correctAnswer} />
      </main>
    </>
  )
}

export default App

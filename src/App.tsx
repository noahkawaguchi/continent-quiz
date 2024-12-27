import './App.css'
import { useState, useEffect } from 'react';
import Header from './components/Header'
import Question from './components/Question'
import Stats from './components/Stats';
import { useFetchAllCCA2 } from "./hooks/useFetchAllCCA2";
import { Utils } from './utils/Utils';

function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);

  useEffect(() => {
    console.log(`Score: ${score}`);
    console.log(`Lives: ${lives}`);
  }, [score, lives]);

  const correctAnswer = (correct: boolean) => {
    console.log(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    } else {
      setLives(prevLives => prevLives - 1);
    }
  }
  
  // Get all valid CCA2 codes with a one-time API call
  const { cca2data, cca2loading, cca2error } = useFetchAllCCA2();
  if (cca2loading) return <p>Loading...</p>;
  if (cca2error) return <p>Error: {cca2error}</p>;
  const randomCCA2: string = Utils.randomCCA2(cca2data!);

  return (
    <>
      <header><Header /></header>
      <main>
        <Question cca2={randomCCA2} correctAnswer={correctAnswer} />
        <Stats score={score} lives={lives}/>
      </main>
    </>
  )
}

export default App

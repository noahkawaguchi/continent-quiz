import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Question from './components/Question';
import Stats from './components/Stats';
import Endgame from './components/Endgame';
import { useFetchAllCCA2 } from "./hooks/useFetchAllCCA2";
import { Utils } from './utils/Utils';

const App: React.FC = (): React.JSX.Element => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);

  const correctAnswer = (correct: boolean) => {
    if (correct) {
      setScore(prevScore => prevScore + 1);
    } else {
      setLives(prevLives => prevLives - 1);
    }
  };

  const newGame = () => {
    setScore(0);
    setLives(5);
    setGameOver(false);
  };
  
  // Get all valid CCA2 codes with a one-time API call
  const { cca2data, cca2loading, cca2error } = useFetchAllCCA2();
  if (cca2loading) return <p>Loading...</p>;
  if (cca2error) return <p>Error: {cca2error}</p>;
  const randomCCA2: string = Utils.randomCCA2(cca2data!);

  return (
    <>
      <header><Header /></header>
      <main>
        {!gameOver && <Question cca2={randomCCA2} correctAnswer={correctAnswer} />}
        {gameOver && <Endgame newGame={newGame} />}
        <Stats score={score} lives={lives} gameOver={gameOver} />
      </main>
    </>
  );
};

export default App

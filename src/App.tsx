import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Question from './components/Question/Question';
import Stats from './components/Stats/Stats';
import Endgame from './components/Endgame/Endgame';
import { useAllValidCCA2 } from "./hooks/useAllValidCCA2";
import { Utils } from './utils/Utils';

const App: React.FC = (): React.JSX.Element => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  const isAnswerCorrect = (correct: boolean) => {
    if (correct) {
      setScore(prevScore => prevScore + 1);
    } else {
      setLives(prevLives => prevLives - 1);
    }
  };
  
  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    }
  }, [lives]);

  const newGame = () => {
    setScore(0);
    setLives(5);
    setGameOver(false);
  };
  
  // Get all valid CCA2 codes with a one-time API call
  const { data, loading, error } = useAllValidCCA2();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const randomCCA2: string = Utils.randomCCA2(data!);

  return (
    <>
      <header><Header /></header>
      <main>
        {!gameOver && <Question cca2={randomCCA2} isAnswerCorrect={isAnswerCorrect} />}
        {gameOver && <Endgame newGame={newGame} />}
        <Stats score={score} lives={lives} gameOver={gameOver} />
      </main>
    </>
  );
};

export default App

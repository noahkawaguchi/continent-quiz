import React from "react";
import { useState, useEffect } from "react";

interface StatsProps {
  score: number,
  lives: number,
  gameOver: boolean,
}

/**
 * Displays the player's stats and handles keeping the high score in local storage.
 * @param score - The current score.
 * @param lives - The number of remaining lives.
 * @param gameOver - Whether the game is over.
 * @returns Headings displaying score, lives, and high score.
 */
const Stats: React.FC<StatsProps> = ({ score, lives, gameOver }): React.JSX.Element => {
  const [highScore, setHighScore] = useState(score);

  // Load any previous high score from local storage once when the component mounts
  useEffect(() => {
    const storedString = localStorage.getItem('storedHighScore');
    const storedNumber = storedString && !isNaN(Number(storedString))
                           ? parseInt(storedString)
                           : score;
    setHighScore(storedNumber);
  }, []);

  // Update the high score in the UI and in local storage if 
  // the user's score is higher than the stored number.
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('storedHighScore', score.toString());
    }
  }, [score, highScore]);
  // Listening for highScore here causes double checks but is necessary so the 
  // component will update local storage when it renders if necessary.

  
  return (
    <>
      <h4>
        <span aria-label="score">Score: {score} </span>
        <span>{!gameOver && `| Lives: ${lives}`}</span>
      </h4>
      <h4>High Score: {highScore}</h4>
    </>
  );
};

export default Stats

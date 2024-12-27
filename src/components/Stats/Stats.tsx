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
    const storedNumber = storedString && !isNaN(Number(storedString)) ? parseInt(storedString) : 0;
    setHighScore(storedNumber);
  }, []);

  // Update the high score in the UI and in local storage if the user scores higher
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('storedHighScore', score.toString());
    }
  }, [score]);

  return (
    <>
      <h4>Score: {score} {!gameOver && `| Lives: ${lives}`}</h4>
      <h4>High Score: {highScore}</h4>
    </>
  );
};

export default Stats

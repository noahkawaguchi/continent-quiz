import React from "react";

interface EndgameProps {
  newGame: Function
}

/**
 * A component showing the Game Over screen.
 * @param newGame - A function to restart the game.
 * @returns "Game Over" heading and "Play Again?" button.
 */
const Endgame: React.FC<EndgameProps> = ({newGame}): React.JSX.Element => {
  return (
    <div className="endgame">
      <h2>Game Over</h2>
      <button onClick={() => newGame()}>Play Again?</button>
    </div>
  );
};

export default Endgame

import React from "react";

interface EndgameProps {
  newGame: Function
}

const Endgame: React.FC<EndgameProps> = ({newGame}): React.JSX.Element => {
  return (
    <div className="endgame">
      <h2>Game Over</h2>
      <button onClick={() => newGame()}>Play Again?</button>
    </div>
  );
};

export default Endgame

import React from "react";

interface StatsProps {
  score: number,
  lives: number,
}

const Stats: React.FC<StatsProps> = ({score, lives}) => {
  return (
    <div className="stats">
      <h4>Score: {score} | Lives: {lives}</h4>
    </div>
  )
}

export default Stats

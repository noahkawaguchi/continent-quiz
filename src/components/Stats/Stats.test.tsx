import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Stats from "./Stats";

describe('Stats', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('should set the high score to score if the key does not exist in local storage', () => {
    render(<Stats score={1} lives={4} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(highScoreText).toHaveTextContent('High Score: 1');
  });

  it('should set the high score to score if the value in local storage is NaN', () => {
    localStorage.setItem('storedHighScore', 'abc');
    render(<Stats score={2} lives={3} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(highScoreText).toHaveTextContent('High Score: 2');
  });

  it('should not change the high score if the stored value is higher than the score', () => {
    localStorage.setItem('storedHighScore', '5');
    render(<Stats score={3} lives={5} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(highScoreText).toHaveTextContent('High Score: 5');
  });

  it('should change the high score if the stored value is lower than the score', () => {
    localStorage.setItem('storedHighScore', '4');
    render(<Stats score={7} lives={2} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(localStorage.setItem).toHaveBeenCalledWith('storedHighScore', '7');
    expect(highScoreText).toHaveTextContent('High Score: 7');
  });

  it('should find the highest score when the score changes multiple times', () => {
    localStorage.setItem('storedHighScore', '2');
    const { rerender } = render(<Stats score={3} lives={3} gameOver={false} />);
    rerender(<Stats score={5} lives={2} gameOver={false} />);
    rerender(<Stats score={1} lives={5} gameOver={false} />);
    rerender(<Stats score={10} lives={4} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(localStorage.setItem).toHaveBeenCalledWith('storedHighScore', '10');
    expect(highScoreText).toHaveTextContent('High Score: 10');
  });

});

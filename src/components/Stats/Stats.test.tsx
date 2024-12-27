import { render, screen, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Stats from "./Stats";

describe('Stats', () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  it('should set the high score to score if the key does not exist in local storage', () => {
    render(<Stats score={1} lives={4} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(highScoreText).toHaveTextContent('High Score: 1');
  });

  it('should set the high score to score if the value in local storage is NaN', () => {
    getItemSpy.mockImplementation(key => key === 'storedHighScore' ? 'abc' : null);
    render(<Stats score={2} lives={3} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(highScoreText).toHaveTextContent('High Score: 2');
  });

  it('should not change the high score if the stored value is higher than the score', () => {
    getItemSpy.mockImplementation(key => key === 'storedHighScore' ? '5' : null);
    render(<Stats score={3} lives={5} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(highScoreText).toHaveTextContent('High Score: 5');
  });

  it('should change the high score if the stored value is lower than the score', () => {
    getItemSpy.mockImplementation(key => key === 'storedHighScore' ? '4' : null);
    render(<Stats score={7} lives={2} gameOver={false} />);
    const highScoreText: HTMLHeadingElement = screen.getByText(/High Score:/);
    expect(setItemSpy).toHaveBeenCalledWith('storedHighScore', '7');
    expect(highScoreText).toHaveTextContent('High Score: 7');
  });

  

});

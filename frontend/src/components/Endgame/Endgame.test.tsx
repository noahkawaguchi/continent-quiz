import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Endgame from './Endgame';

describe('Endgame', () => {
  it('should call newGame when the button is clicked', async () => {
    const user = userEvent.setup();
    const newGame: () => void = jest.fn();
    render(<Endgame newGame={newGame} />);
    const button: HTMLButtonElement = screen.getByText('Play Again?');
    await user.click(button);
    expect(newGame).toHaveBeenCalledTimes(1);
  });
});

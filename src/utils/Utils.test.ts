import { Utils } from './Utils';

describe('randomCCA2', () => {
  it('should return a random element from a list of CCA2 codes', () => {
    const list: Array<string> = ['GS', 'GD', 'CH', 'SL', 'HU'];
    const chosen: string = Utils.randomCCA2(list);
    expect(list.includes(chosen)).toBeTruthy();
  });
});

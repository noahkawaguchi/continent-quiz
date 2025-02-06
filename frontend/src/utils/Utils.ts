export class Utils {
  /**
   * Get a random element from an array of strings.
   * @param arr - The array of strings.
   * @returns A random element from the array.
   */
  static randomCCA2(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
}

/**
 * Polls a random number from the total number without repeating the current number
 *
 * @param total
 * @param currentValue
 *
 * @returns New number
 */
export const pollId = (total: number, currentValue?: number): number => {
  const newId = Math.floor(Math.random() * total);

  if (currentValue === undefined) {
    return newId;
  }

  if (newId === currentValue) {
    return pollId(total, currentValue);
  }

  return newId;
};

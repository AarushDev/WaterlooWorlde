export const MAX_GUESS_LENGTH = 5;

export enum guessState {
  Miss = "Miss",
  Correct = "Correct",
  Misplaced = "Misplaced",
}

export function validate(guess: string, target: string) {
  const guessArray = [];

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      guessArray.push(guessState.Correct);
    } else if (target.includes(guess[i])) {
      guessArray.push(guessState.Misplaced);
    } else {
      guessArray.push(guessState.Miss);
    }
  }

  return guessArray;
}

export function init() {
  const guessArray = [];

  for (let i = 0; i < 6; i++) {
    guessArray.push("");
  }

  return guessArray;
}

export function initState() {
  const guessArray = [];

  for (let i = 0; i < 6; i++) {
    guessArray.push([]);
  }

  return guessArray;
}

export function winner(guessStateArray: guessState[]) {
  for (let i = 0; i < guessStateArray.length; i++) {
    if (guessStateArray[i] !== guessState.Correct) {
      return false;
    }
  }
  return true;
}

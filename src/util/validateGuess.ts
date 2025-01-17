import _ from "lodash";

export const MAX_GUESS_LENGTH = 5;
export const MAX_GUESS_ATTEMPTS = 6;

export enum guessState {
  Miss = "Miss",
  Correct = "Correct",
  Misplaced = "Misplaced",
}

export function validate(guess: string, target: string): guessState[] {
  const guessArray = initStateArray();
  const curGuessMap = _.countBy(target.split(""));

  //Correct Loop
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === target[i]) {
      curGuessMap[guess[i]] -= 1;
      guessArray[i] = guessState.Correct;
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (
      target.includes(guess[i]) &&
      guess[i] !== target[i] &&
      curGuessMap[guess[i]] > 0
    ) {
      guessArray[i] = guessState.Misplaced;
      curGuessMap[guess[i]] -= 1;
    } else if (guessArray[i] != guessState.Correct) {
      guessArray[i] = guessState.Miss;
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

export function initStateArray() {
  const guessArray = [];

  for (let i = 0; i < 5; i++) {
    guessArray.push(guessState.Miss);
  }

  return guessArray;
}

export function winner(guessStateArray: guessState[]) {
  return guessStateArray.every((entry) => {
    return entry === guessState.Correct;
  });
}

export function shake() {
  const randNum = Math.random() * 10;
  return randNum > 5;
}

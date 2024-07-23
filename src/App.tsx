import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import GameRow from "./Components/GameRow";
import {
  guessState,
  init,
  initState,
  MAX_GUESS_LENGTH,
  validate,
} from "./util/validateGuess";

//Maybe add an array of all our guesses in state and map through it.
export default function App() {
  const [guesses, setGuesses] = useState(init());
  const [rowAnswer, setRowAnswer] = useState<guessState[][]>(initState());
  const [curGuess, setCurGuess] = useState(0);
  const [targetWord, setTargetWord] = useState("BOOST");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const curKey = event.key.toUpperCase();

      if (curKey.length === 1 && guesses[curGuess].length != MAX_GUESS_LENGTH) {
        setGuesses((prevState) =>
          prevState.map((guess, index) =>
            index === curGuess ? (guess += curKey) : guess
          )
        );
      } else if (
        curKey === "ENTER" &&
        guesses[curGuess].length === MAX_GUESS_LENGTH
      ) {
        const answer = validate(guesses[curGuess], targetWord);
        setRowAnswer((prevState) =>
          prevState.map((row, index) => (index === curGuess ? answer : row))
        );
        setCurGuess((prevState) => prevState + 1);
      } else if (curKey === "BACKSPACE" && guesses[curGuess].length > 0) {
        setGuesses((prevState) =>
          prevState.map((guess, index) =>
            index === curGuess ? guess.slice(0, -1) : guess
          )
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <main className="flex flex-col items-center">
        {guesses.map((row, index) => (
          <GameRow guess={row} key={index} rowAnswer={rowAnswer[index]} />
        ))}
      </main>
    </div>
  );
}

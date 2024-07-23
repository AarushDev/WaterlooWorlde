import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import GameRow from "./Components/GameRow";
import {
  guessState,
  init,
  initState,
  MAX_GUESS_LENGTH,
  shake,
  validate,
  winner,
} from "./util/validateGuess";

export default function App() {
  const [guesses, setGuesses] = useState(init());
  const [rowAnswer, setRowAnswer] = useState<guessState[][]>(initState());
  const [curGuess, setCurGuess] = useState(0);
  const [targetWord, setTargetWord] = useState("BOOST");
  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);
  const [isShake, setIsShake] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const curKey = event.key.toUpperCase();

      if (curKey.length === 1 && guesses[curGuess].length != MAX_GUESS_LENGTH) {
        setGuesses((prevState) =>
          prevState.map((guess, index) =>
            index === curGuess ? (guess += curKey) : guess
          )
        );
      } else if (curKey === "ENTER") {
        if (guesses[curGuess].length !== MAX_GUESS_LENGTH || shake()) {
          setIsShake(true);
          return;
        }
        const answer = validate(guesses[curGuess], targetWord);
        if (winner(answer)) {
          setWin(true);
        } else if (curGuess + 1 >= 6) {
          setLoss(true);
        }
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
      {win && <p className="text-3xl text-pink-500">YOU WON</p>}
      {!loss && (
        <main className="flex flex-col items-center mt-6">
          {guesses.map((row, index) => (
            <GameRow
              guess={row}
              key={index}
              rowAnswer={rowAnswer[index]}
              isShake={index === curGuess ? isShake : false}
            />
          ))}
        </main>
      )}
    </div>
  );
}

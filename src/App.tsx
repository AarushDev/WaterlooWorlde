import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import GameRow from "./Components/GameRow";
import {
  guessState,
  init,
  initState,
  MAX_GUESS_LENGTH,
  MAX_GUESS_ATTEMPTS,
  validate,
  winner,
} from "./util/validateGuess";

//add animation when guess
export default function App() {
  const [guesses, setGuesses] = useState(init());
  const [rowAnswer, setRowAnswer] = useState<guessState[][]>(initState());
  const [curGuess, setCurGuess] = useState(0);

  const [targetWord, setTargetWord] = useState("HELLO");

  const [win, setWin] = useState(false);
  const [loss, setLoss] = useState(false);
  const [invalidGuess, setInvalidGuess] = useState(false);

  useEffect(() => {
    async function fetchWords() {
      try {
        const response = await fetch(
          "https://api.datamuse.com/words?sp=?????&max=500"
        );
        const data = await response.json();
        setTargetWord(
          data[Math.floor(Math.random() * data.length)].word.toUpperCase()
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchWords();
  }, []);

  const AddLetter = (curKey: string) => {
    setGuesses((prevState) =>
      prevState.map((guess, index) =>
        index === curGuess ? (guess += curKey) : guess
      )
    );
  };

  const SubmitInvalidGuess = () => {
    setInvalidGuess(true);
    setTimeout(() => setInvalidGuess(false), 500);
  };

  const SubmitValidGuess = () => {
    const answer = validate(guesses[curGuess], targetWord);
    if (winner(answer)) {
      setWin(true);
    } else if (curGuess + 1 >= MAX_GUESS_ATTEMPTS) {
      setLoss(true);
    }
    setRowAnswer((prevState) =>
      prevState.map((row, index) => (index === curGuess ? answer : row))
    );
    setCurGuess((prevState) => prevState + 1);
  };

  const DeleteGuess = () => {
    setGuesses((prevState) =>
      prevState.map((guess, index) =>
        index === curGuess ? guess.slice(0, -1) : guess
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const curKey = event.key.toUpperCase();

      if (
        curKey.length === 1 &&
        curKey.charCodeAt(0) >= 65 &&
        curKey.charCodeAt(0) <= 90 &&
        guesses[curGuess].length != MAX_GUESS_LENGTH
      ) {
        AddLetter(curKey);
      } else if (curKey === "ENTER") {
        if (guesses[curGuess].length !== MAX_GUESS_LENGTH) {
          return SubmitInvalidGuess();
        }
        SubmitValidGuess();
      } else if (curKey === "BACKSPACE" && guesses[curGuess].length > 0) {
        DeleteGuess();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex flex-col h-full">
      <NavBar />
      {win && <p className="text-3xl text-pink-500">YOU WON</p>}
      {loss && (
        <p className="text-3xl text-red-500">
          YOU LOST THE WORD WAS {targetWord}
        </p>
      )}
      {!loss && (
        <main className="flex flex-col items-center mt-6">
          {guesses.map((row, index) => (
            <GameRow
              guess={row}
              key={index}
              rowAnswer={rowAnswer[index]}
              Shake={invalidGuess && index === curGuess ? "animate-shake" : ""}
            />
          ))}
        </main>
      )}
    </div>
  );
}

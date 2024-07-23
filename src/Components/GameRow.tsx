import { guessState, MAX_GUESS_LENGTH, winner } from "../util/validateGuess";

interface GameRowProps {
  guess: string;
  rowAnswer: guessState[];
}

interface TileProps {
  value: string;
  guessResult: guessState;
}

export default function GameRow({ guess, rowAnswer }: GameRowProps) {
  const isShake = winner(rowAnswer);

  const paddedGuess = guess.padEnd(MAX_GUESS_LENGTH, " ").split("");

  const displayGuess = paddedGuess.map((char, index) => (
    <Tile key={index} value={char} guessResult={rowAnswer[index]} />
  ));

  return (
    <div className={`flex gap-2 ${isShake && "animate-shake"}`}>
      {displayGuess}
    </div>
  );
}

function Tile({ value, guessResult }: TileProps) {
  const style =
    guessResult == null
      ? "border-wordleGray"
      : CharacterStyles[guessResult] + " text-white";

  return (
    <div
      className={`border-2 flex items-center justify-center h-16 w-16 text-3xl font-bold mt-2 ${style}`}
    >
      {value}
    </div>
  );
}

const CharacterStyles = {
  [guessState.Correct]: "bg-wordleGreen border-wordleGreen",
  [guessState.Misplaced]: "bg-wordleYellow border-wordleYellow",
  [guessState.Miss]: "bg-wordleGray border-wordleGray",
};

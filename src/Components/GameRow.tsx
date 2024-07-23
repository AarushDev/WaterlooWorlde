import { guessState, MAX_GUESS_LENGTH } from "../util/validateGuess";

interface GameRowProps {
  guess: string;
  rowAnswer: guessState[];
}

interface TileProps {
  value: string;
  guessResult: guessState;
}

export default function GameRow({ guess, rowAnswer }: GameRowProps) {
  const paddedGuess = guess.padEnd(MAX_GUESS_LENGTH, " ").split("");

  const displayGuess = paddedGuess.map((char, index) => (
    <Tile key={index} value={char} guessResult={rowAnswer[index]} />
  ));

  return <div className="flex gap-4 mt-4">{displayGuess}</div>;
}

function Tile({ value, guessResult }: TileProps) {
  const style =
    guessResult == null ? "border-gray-500" : CharacterStyles[guessResult];

  return (
    <div
      className={`border-2 flex items-center justify-center h-16 w-16 text-2xl font-medium ${style}`}
    >
      {value}
    </div>
  );
}

const CharacterStyles = {
  [guessState.Correct]: "bg-green-500 border-green-500",
  [guessState.Misplaced]: "bg-yellow-500 border-yellow-500",
  [guessState.Miss]: "bg-red-500 border-red-500",
};

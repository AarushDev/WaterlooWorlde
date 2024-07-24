import { guessState, MAX_GUESS_LENGTH, shake } from "../util/validateGuess";

interface GameRowProps {
  guess: string;
  rowAnswer: guessState[];
  Shake: string;
}

interface TileProps {
  value: string;
  guessResult: guessState;
  pulse: boolean;
}

export default function GameRow({ guess, rowAnswer, Shake }: GameRowProps) {
  const paddedGuess = guess.padEnd(MAX_GUESS_LENGTH, " ").split("");

  const displayGuess = paddedGuess.map((char, index) => (
    <Tile
      key={index}
      value={char}
      guessResult={rowAnswer[index]}
      pulse={index === guess.length - 1 ? true : false}
    />
  ));

  return <div className={`flex gap-2 ${Shake}`}>{displayGuess}</div>;
}

function Tile({ value, guessResult, pulse }: TileProps) {
  const style =
    guessResult == null
      ? "border-wordleGray"
      : CharacterStyles[guessResult] + " text-white";

  const animateGuess = "animate-enlarge";

  return (
    <div
      className={`border-2 flex items-center justify-center h-16 w-16 text-3xl font-bold mt-2 ${style} ${
        pulse && animateGuess
      }`}
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

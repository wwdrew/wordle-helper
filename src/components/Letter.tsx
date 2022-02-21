import { useState } from "react";
import { useWordList } from "../modules/wordList/wordListContext";
import { Positions } from "../modules/wordList/wordListTypes";

interface Props {
    letter: string;
    position: Positions;
}

export function Letter({letter, position}: Props) {
  const {greenLetter, yellowLetter, eliminateLetter } = useWordList();
  const [showWindow, setShowWindow] = useState(false);

  return (
  <li className="letter" onMouseEnter={() => setShowWindow(true)} onMouseLeave={() => setShowWindow(false)}>
    {letter}
    {showWindow ? (
      <div>
        <span className="letter letter-action eliminate-letter-action" onClick={() => eliminateLetter(letter)}>{letter}</span>
        <span className="letter letter-action yellow-letter-action" onClick={() => yellowLetter(letter, position)}>{letter}</span>
        <span className="letter letter-action green-letter-action" onClick={() => greenLetter(letter, position)}>{letter}</span>
      </div>
    ) : null}
    </li>
  )
}

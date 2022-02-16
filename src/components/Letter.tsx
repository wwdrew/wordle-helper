// import { useState } from "react";
import { useState } from "react";
import { Positions, useLetters } from "../modules/letters/hooks/useLetters";

interface Props {
    letter: string;
    position: Positions;
}

export function Letter({letter, position}: Props) {
  const {greenLetter, yellowLetter, eliminateLetter } = useLetters();
  const [showWindow, setShowWindow] = useState(false);

  return (
  <li className="letter" onMouseEnter={() => setShowWindow(true)} onMouseLeave={() => setShowWindow(false)}>
    {letter}
    {showWindow ? (
      <div>
        <span className="letter eliminate-letter-action" onClick={() => eliminateLetter(letter)}>{letter}</span>
        <span className="letter yellow-letter-action" onClick={() => yellowLetter(letter, position)}>{letter}</span>
        <span className="letter green-letter-action" onClick={() => greenLetter(letter, position)}>{letter}</span>
      </div>
    ) : null}
    </li>
  )
}

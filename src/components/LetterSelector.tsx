import { useWordList } from '../modules/wordList/wordListContext';
import { Positions } from '../modules/wordList/wordListTypes';
import {Letter} from './Letter';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

interface Props {
    position: Positions;
}

export function LetterSelector({position}: Props) {
  const { state } = useWordList();
  const { eliminated, positions } = state;
  const { state: columnState, exceptions } = positions[position];
  const columnPosition = positions[position];

  let letter = '';

  if (columnPosition.state === 'green') {
    letter = columnPosition.letter;
  }

  return (
      <div>
          <p className={`position-letter position-${positions[position].state}`}>{letter}</p>
          {
            columnState !== 'green' ? (

              <ul className="letter-selector">
            {letters
              .filter(letter => !eliminated.includes(letter))
              .filter(letter => !exceptions.includes(letter))
              .map(letter => <Letter key={`${position}-${letter}`} letter={letter} position={position}/>)}
            </ul>
              ) : null
            }
      </div>
    )
}

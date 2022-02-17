import { useWordList } from '../modules/wordList/wordListContext';
import { Positions } from '../modules/wordList/wordListTypes';
import {Letter} from './Letter';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

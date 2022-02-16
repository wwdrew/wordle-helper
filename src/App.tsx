import { useEffect, useReducer, useState } from 'react';
import './App.css';
import { LetterSelector } from './components/LetterSelector';
import { initialState, LettersContext, lettersReducer } from './modules/letters/hooks/useLetters';
import possibleGuesses from './allowed-guesses.json'

function App() {
  const [state, dispatch] = useReducer(lettersReducer, initialState);
  const [allowedGuesses, setAllowedGuesses] = useState<string[]>(possibleGuesses)

  useEffect(() => {
    const { eliminated, positions } = state;
    const position1 = positions['1']
    const position2 = positions['2']
    const position3 = positions['3']
    const position4 = positions['4']
    const position5 = positions['5']

    let newAllowedGuesses = [...allowedGuesses];

    if (eliminated.length > 0) {
      newAllowedGuesses = newAllowedGuesses.filter(word =>
        !Boolean(eliminated.find(letter => word.split('').includes(letter.toLocaleLowerCase())))
        );
    }

    if (position1.state === 'green') {
      newAllowedGuesses = newAllowedGuesses.filter(word => word[0] === position1.letter.toLocaleLowerCase());
    }

    if (position2.state === 'green') {
      newAllowedGuesses = newAllowedGuesses.filter(word => word[1] === position2.letter.toLocaleLowerCase());
    }

    if (position3.state === 'green') {
      newAllowedGuesses = newAllowedGuesses.filter(word => word[2] === position3.letter.toLocaleLowerCase());
    }

    if (position4.state === 'green') {
      newAllowedGuesses = newAllowedGuesses.filter(word => word[3] === position4.letter.toLocaleLowerCase());
    }

    if (position5.state === 'green') {
      newAllowedGuesses = newAllowedGuesses.filter(word => word[4] === position5.letter.toLocaleLowerCase());
    }


    setAllowedGuesses(newAllowedGuesses);
  }, [state]);

  console.log({state, allowedGuesses})

  return (
    <LettersContext.Provider value={{state, dispatch}}>

    <p>Possible words: {allowedGuesses.length}</p>
    <div className="App">
      <LetterSelector position="1"/>
      <LetterSelector position='2'/>
      <LetterSelector position="3"/>
      <LetterSelector position="4"/>
      <LetterSelector position="5"/>
    </div>
    </LettersContext.Provider>
  );
}

export default App;

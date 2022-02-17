import { useReducer } from 'react';
import { LetterSelector } from './components/LetterSelector';
import { WordListCount } from './components/WordListCount';
import { initialState, LettersContext, lettersReducer } from './modules/letters/hooks/useLetters';
import { WordListProvider } from './modules/words/context/wordsProvider';

import './App.css';

function App() {
  const [state, dispatch] = useReducer(lettersReducer, initialState);

  return (
    <WordListProvider>

    <LettersContext.Provider value={{state, dispatch}}>

    <WordListCount />
    <div className="App">
      <LetterSelector position={0}/>
      <LetterSelector position={1}/>
      <LetterSelector position={2}/>
      <LetterSelector position={3}/>
      <LetterSelector position={4}/>
    </div>
    </LettersContext.Provider>
    </WordListProvider>
  );
}

export default App;

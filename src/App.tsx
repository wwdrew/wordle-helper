import { LetterSelector } from './components/LetterSelector';
import { WordListCount } from './components/WordListCount';

import './App.css';
import { WordListProvider } from './modules/wordList/wordListContext';

function App() {
  return (
    <WordListProvider>
      <WordListCount />
      <div className="App">
        <LetterSelector position={0}/>
        <LetterSelector position={1}/>
        <LetterSelector position={2}/>
        <LetterSelector position={3}/>
        <LetterSelector position={4}/>
      </div>
    </WordListProvider>
  );
}

export default App;

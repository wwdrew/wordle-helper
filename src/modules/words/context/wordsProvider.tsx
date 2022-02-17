import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { Positions } from '../../letters/hooks/useLetters';
import wordList from './allowed-guesses.json';


type GreenLetterAction = {
  type: 'GREEN_LETTER'
  payload: {
    position: Positions
    letter: string
  }
}

type YellowLetterAction = {
  type: 'YELLOW_LETTER'
  payload: {
    position: Positions
    letter: string
  }
}

type EliminateLetterAction = {
  type: 'ELIMINATE_LETTER'
  payload: string
}

export type WordListAction = GreenLetterAction | YellowLetterAction | EliminateLetterAction;

type WordListState = string[];

const WordListContext = createContext<{
  state: WordListState;
  dispatch: (action: WordListAction) => void;
} | undefined>(undefined);

interface WordListProviderProps {
  children: ReactNode;
}

function wordListReducer(state: WordListState, action: WordListAction): WordListState {
  switch(action.type) {

    case 'GREEN_LETTER': {
      const position = Number(action.payload.position) - 1;
      return state.filter(word => word[position] === action.payload.letter.toLocaleLowerCase());

    }
    case 'YELLOW_LETTER': {
      const position = Number(action.payload.position) - 1;
      return state.filter(word => word[position] !== action.payload.letter.toLocaleLowerCase());
    }

    case 'ELIMINATE_LETTER': {
      return state.filter(word => !word.split('').includes(action.payload.toLocaleLowerCase()));
    }

    default:
      return state;
  }
}

function WordListProvider({ children }: WordListProviderProps) {
  const [state, dispatch] = useReducer(wordListReducer, wordList);

  return (
    <WordListContext.Provider value={{state, dispatch}}>
      {children}
    </WordListContext.Provider>
  )
}

function useWordList() {
  const context = useContext(WordListContext);

  if (context === undefined) {
    throw new Error('useWordList must be used within a WordListProvider');
  }

  return context;
}

export {WordListProvider, useWordList};

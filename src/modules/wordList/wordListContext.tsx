import { createContext, ReactNode, useContext, useReducer } from 'react';
import { ColumnState, Positions, WordListAction } from './wordListTypes';
import wordList from './allowed-guesses.json'

interface WordListState {
  wordList: string[];
  positions: {
    [key in Positions]: ColumnState
  },
  eliminated: string[]
}

const initialState: WordListState = {
  wordList,
  positions: {
    0: { state: 'unknown', exceptions: [] },
    1: { state: 'unknown', exceptions: [] },
    2: { state: 'unknown', exceptions: [] },
    3: { state: 'unknown', exceptions: [] },
    4: { state: 'unknown', exceptions: [] },
  },
  eliminated: []
}

interface WordListContextValues {
  state: WordListState;
  dispatch: (action: WordListAction) => void;
}

const WordListContext = createContext<WordListContextValues | undefined>(undefined);

function wordListReducer(state: WordListState, action: WordListAction): WordListState {
  switch(action.type) {
    case 'GREEN_LETTER': {
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.payload.position]: {
            state: 'green',
            letter: action.payload.letter
          }
        },
        wordList: state.wordList.filter(word => word[action.payload.position] === action.payload.letter)
      }

    }
    case 'YELLOW_LETTER': {
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.payload.position]: {
            state: 'yellow',
            exceptions: [...state.positions[action.payload.position].exceptions, action.payload.letter]
          }
        },
        wordList: state.wordList.filter(word => word[action.payload.position] !== action.payload.letter)
      }
    }

    case 'ELIMINATE_LETTER': {
      return {
        ...state,
        eliminated: [...state.eliminated, action.payload],
        wordList: state.wordList.filter(word => !word.split('').includes(action.payload))
      }
    }

    default:
      return state;
  }
}

interface WordListProviderProps {
  children: ReactNode;
}

export function WordListProvider({ children }: WordListProviderProps) {
  const [state, dispatch] = useReducer(wordListReducer, initialState);

  return (
    <WordListContext.Provider value={{state, dispatch}}>
      {children}
    </WordListContext.Provider>
  )
}

interface useWordListHook extends WordListContextValues {
  eliminateLetter: (letter: string) => void
  greenLetter: (letter: string, position: Positions) => void
  yellowLetter: (letter: string, position: Positions) => void
}

export function useWordList(): useWordListHook {
  const context = useContext(WordListContext);

  if (context === undefined) {
    throw new Error('useWordList must be used within a WordListProvider');
  }

  const { state, dispatch } = context;

  function eliminateLetter(letter: string) {
    dispatch({
      type: 'ELIMINATE_LETTER',
      payload: letter
    })
  }

  function greenLetter(letter: string, position: Positions) {
    dispatch({
      type: 'GREEN_LETTER',
      payload: {
        position,
        letter
      }
    })
  }

  function yellowLetter(letter: string, position: Positions) {
    dispatch({
      type: 'YELLOW_LETTER',
      payload: {
        position,
        letter
      }
    })
  }

  return {
    state,
    dispatch,
    eliminateLetter,
    greenLetter,
    yellowLetter
  };
}

import { useContext } from "react";

import { createContext } from 'react';

export type LettersContextValues = {
  state: LettersState,
  dispatch: (action: LettersAction) => void
};

export interface LettersState  {
  positions: {
    1: ColumnState,
    2: ColumnState,
    3: ColumnState,
    4: ColumnState,
    5: ColumnState,
  },
  eliminated: string[]
}

export const initialState: LettersState = {
  positions: {
    1: { state: 'unknown', exceptions: [] },
    2: { state: 'unknown', exceptions: [] },
    3: { state: 'unknown', exceptions: [] },
    4: { state: 'unknown', exceptions: [] },
    5: { state: 'unknown', exceptions: [] },
  },
  eliminated: []
}

export const LettersContext = createContext<LettersContextValues>({state: initialState, dispatch: () => undefined});

export type GreenColumnState = {
  state: 'green'
  letter: string
  exceptions: string[]
}

type YellowColumnState = {
  state: 'yellow'
  exceptions: string[]
}

type UnknownColumnState = {
  state: 'unknown'
  exceptions: string[]
}

type ColumnState = YellowColumnState | GreenColumnState | UnknownColumnState;


export type Positions = '1' | '2' | '3' | '4' | '5'

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

export type LettersAction = GreenLetterAction | YellowLetterAction | EliminateLetterAction;

export function lettersReducer(state: LettersState, action: LettersAction): LettersState {
  switch(action.type) {
    case 'ELIMINATE_LETTER': {
      return {
        ...state,
        eliminated: [...state.eliminated, action.payload]
      }
    }

    case 'GREEN_LETTER': {
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.payload.position]: {
            state: 'green',
            letter: action.payload.letter
          }
        }
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
        }
      }
    }

    default:
      return state;
  }
}

interface UseLettersHook extends LettersContextValues {
  eliminateLetter: (letter: string) => void;
  greenLetter: (letter: string, position: Positions) => void;
  yellowLetter: (letter: string, position: Positions) => void;
}

export function useLetters(): UseLettersHook {
  const {state, dispatch} = useContext(LettersContext);

  // console.log({state, dispatch})
  function eliminateLetter(letter: string) {
    console.log("eliminate letter", {letter})
    dispatch({
      type: 'ELIMINATE_LETTER',
      payload: letter
    })
  }

  function greenLetter(letter: string, position: Positions) {
    console.log("green letter", {letter, position})
    dispatch({
      type: 'GREEN_LETTER',
      payload: {
        position,
        letter
      }
    })
  }

  function yellowLetter(letter: string, position: Positions) {
    console.log("yellow letter", {letter, position})
    dispatch({
      type: 'YELLOW_LETTER',
      payload: {
        position,
        letter
      }
    })
  }

  return {
    dispatch,
    state,
    eliminateLetter,
    greenLetter,
    yellowLetter
  }
}


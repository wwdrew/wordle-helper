import { ReactNode, useReducer, createContext } from "react";
import { initialState, LettersAction, lettersReducer, LettersState } from "../hooks/useLetters";

interface LettersProviderProps {
  children: ReactNode;
}

export type LettersContextValues = {
  state: LettersState,
  dispatch: (action: LettersAction) => void
}

const LettersContext = createContext<LettersContextValues>({ state: initialState, dispatch: () => console.log("this")});

export function LettersProvider({ children }: LettersProviderProps) {
  const [state, dispatch] = useReducer(lettersReducer, initialState);

  return <LettersContext.Provider value={{state, dispatch}}>
    {children}
  </LettersContext.Provider>
}

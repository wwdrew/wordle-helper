
export type Positions = 0 | 1 | 2 | 3 | 4

type GreenColumnState = {
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

export type ColumnState = YellowColumnState | GreenColumnState | UnknownColumnState;

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

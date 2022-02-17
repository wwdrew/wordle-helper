import React from 'react';
import { useWordList } from '../modules/words/context/wordsProvider';

export function WordListCount() {
  const { state } = useWordList();

  console.log({state});

  return (
    <p>Possible words: {state.length}</p>
  )
}

import { useWordList } from "../modules/wordList/wordListContext";

export function WordListCount() {
  const { state } = useWordList();

  console.log({state});

  return (
    <p>Possible words: {state.wordList.length}</p>
  )
}

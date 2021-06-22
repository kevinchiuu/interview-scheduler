import { useState } from 'react';

//custom hook allows you to keep track of visual mode and user history 
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    if (!replace) {
      setHistory(() => [...history, newMode]);
    }

    setMode(() => newMode);
  }
  
  const back = () => {
    let tempHistory = [...history]

    if (history[history.length - 1] !== initial) {
      tempHistory.pop()
      setMode(() => tempHistory[tempHistory.length - 1])
      setHistory(tempHistory)
    }

  }

  return { mode, transition, back };

}
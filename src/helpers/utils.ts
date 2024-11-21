export interface KeyStrokeData {
    timestamp: number;
    correct: boolean;
  }
  
  export const calculateWPM = (
    keystrokes: KeyStrokeData[],
    timeInSeconds: number
  ): { wpm: number; raw: number } => {
    const timeInMinutes = timeInSeconds / 60;
    
    // Raw WPM: All keystrokes / 5 / time
    const totalKeystrokes = keystrokes.length;
    const rawWPM = Math.round((totalKeystrokes / 5) / timeInMinutes);
    
    // Net WPM: Only correct keystrokes / 5 / time
    const correctKeystrokes = keystrokes.filter(k => k.correct).length;
    const netWPM = Math.round((correctKeystrokes / 5) / timeInMinutes);
    
    return {
      wpm: netWPM,
      raw: rawWPM
    };
  };
'use client';

import { useMemo, useState, useEffect } from 'react';
import Header from '../components/Header';
import Board from '../components/Board';

interface GridSetting {
  rows: number
  cols: number
  mines: number
}

const difficultyToGridSize = {
  easy: {
    rows: 9,
    cols: 9,
    mines: 10
  },
  medium: {
    rows: 16,
    cols: 16,
    mines: 40
  },
  hard: {
    rows: 16,
    cols: 30,
    mines: 99,
  },
  india: {
    rows: 20,
    cols: 30,
    mines: 145,
  }
}



export default function Home() {
  const [difficulty, setDifficulty] = useState('Easy')
  const gridSetting: GridSetting = useMemo(() =>
    difficulty == 'Easy' ? difficultyToGridSize.easy :
      difficulty == 'Medium' ? difficultyToGridSize.medium :
        difficulty == 'Hard' ? difficultyToGridSize.hard :
          difficulty == '印度' ? difficultyToGridSize.india :
            difficultyToGridSize.easy,
    [difficulty])
  const [time, setTime] = useState(0)
  const [minesLeft, setminesLeft] = useState(gridSetting.mines);
  const [isFlagging, setIsFlagging] = useState(false);
  const [boardKey, setBoardKey] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log('GridSetting changed:', gridSetting);
    console.log('Current mines:', gridSetting.mines);
  }, [gridSetting]);

  const resetGame = () => {
    setTime(0);
    setminesLeft(gridSetting.mines);
    setIsFlagging(false);
    setBoardKey(prev => prev + 1);
  };

  return <>
    <div className="flex flex-col items-center justify-center w-full max-h-screen bg-gray-100">

      <div className="flex flex-col w-full items-center gap-4">
        <Header
          difficulty={difficulty}
          time={time}
          minesLeft={minesLeft}
          isFlagging={isFlagging}
          onDifficultyChange={() => {
            const newDifficulty =
              difficulty === 'Easy' ? 'Medium' :
                difficulty === 'Medium' ? 'Hard' :
                  difficulty === 'Hard' ? '印度' : 'Easy';
            setTime(0)
            setDifficulty(newDifficulty)
            setminesLeft(gridSetting.mines)
            setBoardKey(prev => prev + 1);
          }}
          onMode={() => {
            setIsFlagging(!isFlagging);
          }}
          onReset={resetGame}
        />

        <Board
          key={boardKey}
          rows={gridSetting.rows}
          cols={gridSetting.cols}
          mines={gridSetting.mines}
          isFlagging={isFlagging}
        />
      </div>
    </div>
  </>;
}

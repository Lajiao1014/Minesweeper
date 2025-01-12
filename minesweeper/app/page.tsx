'use client';

import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Square from '../components/Square';
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

  return <>
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Header
        difficulty={difficulty}
        time={time}
        minesLeft={minesLeft}
        onDifficultyChange={() => {
          const levels = ["Easy", "Medium", "Hard", "印度"]
          const currentIndex = levels.indexOf(difficulty)
          const nextIndex = currentIndex === 3 ? 0 : currentIndex + 1
          setDifficulty(levels[nextIndex])
          const newDifficulty = levels[nextIndex];
          const newMines = newDifficulty === 'Easy' ? 10 :
            newDifficulty === 'Medium' ? 40 :
              newDifficulty === 'Hard' ? 99 :
                145;
          setminesLeft(newMines);
        }}
        onMode={() => {
          setIsFlagging(!isFlagging)
        }}
        onReset={() => {
          setTime(0);
          setminesLeft(gridSetting.mines);
        }}
      />

      <Board
        rows={gridSetting.rows}
        cols={gridSetting.cols}
        mines={gridSetting.mines}
      />
    </div>
  </>;
}

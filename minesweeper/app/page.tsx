'use client';

import { useState } from 'react';
import Header from '../components/Header';

export default function Home() {

  const [difficulty, setDifficulty] = useState('Easy')
  const [time, setTime] = useState(0)
  const [minesLeft, setminesLeft] = useState(10)
  const [isFlagging, setIsFlagging] = useState(false);

  return <>

    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Header
        difficulty={difficulty}
        time={time}
        minesLeft={minesLeft}
        onDifficultyChange={() => {
          const levels = ["Easy", "Medium", "Hard"]
          const currentIndex = levels.indexOf(difficulty)
          const nextIndex = currentIndex === 2 ? 0 : currentIndex + 1
          setDifficulty(levels[nextIndex])
        }}
        onMode={() => {
          setIsFlagging(!isFlagging)
        }}
        onReset={() => {
          setTime(0);
          setminesLeft(10);
        }}

      />
    </div>

  </>

    ;
}

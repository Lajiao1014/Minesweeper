'use client';


import React, { useState, useEffect } from 'react';
import Square from './Square';

interface BoardProps {
    rows: number;
    cols: number;
    mines: number;
    isFlagging: boolean;
}

type CellType = {
    isRevealed: boolean;
    hasMine: boolean;
    hasFlag: boolean;
    neighborMines: number;
};

type BoardType = CellType[][];

const Board = ({ rows, cols, mines, isFlagging }: BoardProps) => {
    // init
    const initializeBoard = () => {

        const newBoard = Array(cols).fill(null).map(() =>
            Array(rows).fill(null).map(() => ({
                isRevealed: false,
                hasMine: false,
                hasFlag: false,
                neighborMines: 0
            }))
        );
        //randomMines
        let minesPlaced = 0;
        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!newBoard[col][row].hasMine) {
                newBoard[col][row].hasMine = true;
                minesPlaced++;
            }
        }
        //Check neightborMines number
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                if (!newBoard[col][row].hasMine) {
                    let count = 0;

                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            const newRow = row + i;
                            const newCol = col + j;
                            if (
                                newRow >= 0 && newRow < rows &&
                                newCol >= 0 && newCol < cols &&
                                newBoard[newCol][newRow].hasMine
                            ) {
                                count++;
                            }
                        }
                    }
                    newBoard[col][row].neighborMines = count;
                }
            }
        }

        return newBoard;
    };

    const [board, setBoard] = useState<BoardType>(initializeBoard);
    const [gameStatus, setGameStatus] = useState<'playing' | 'win' | 'lose'>('playing');

    useEffect(() => {
        setBoard(initializeBoard());
        setGameStatus('playing');
    }, [rows, cols, mines]);

    const handleClick = (row: number, col: number) => {
        //Avoid repeated click
        if (board[col][row].isRevealed) return;

        const newBoard = [...board];

        //FlqggingState
        if (isFlagging) {
            newBoard[col][row].hasFlag = !newBoard[col][row].hasFlag;
            setBoard([...newBoard]);
            return;
        }
        //Show All The Mines and 'lose'
        if (board[col][row].hasMine) {

            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    if (newBoard[c][r].hasMine) {
                        newBoard[c][r].isRevealed = true;
                    }
                }
            }
            setBoard([...newBoard]);
            setGameStatus('lose');
            return;
        }

        //OpenEmptySquare
        const revealEmpty = (r: number, c: number) => {

            if (r < 0 || r >= rows || c < 0 || c >= cols) return;

            if (newBoard[c][r].isRevealed || newBoard[c][r].hasMine) return;


            newBoard[c][r].isRevealed = true;


            if (newBoard[c][r].neighborMines === 0) {

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        revealEmpty(r + i, c + j);
                    }
                }
            }
        };


        revealEmpty(row, col);
        setBoard([...newBoard]);

        //How To Win?
        let isWin = true;
        for (let c = 0; c < cols; c++) {
            for (let r = 0; r < rows; r++) {
                if (!newBoard[c][r].hasMine && !newBoard[c][r].isRevealed) {
                    isWin = false;
                    break;
                }
            }
        }
        if (isWin) {
            setGameStatus('win');
        }
    };

    return (
        <div className="relative">
            <div className="grid gap-0 p-4 mx-auto"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 24px)`,
                    gridTemplateRows: `repeat(${rows}, 24px)`,
                    border: '1px solid #ccc'
                }}>
                {board.map((row, colIndex) =>
                    row.map((cell, rowIndex) => (
                        <Square
                            key={`${colIndex}-${rowIndex}`}
                            row={rowIndex}
                            col={colIndex}
                            {...cell}
                            onClick={handleClick}
                        />
                    ))
                )}
            </div>

            {gameStatus !== 'playing' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`p-4 rounded-lg ${gameStatus === 'win'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}>
                        {gameStatus === 'win'
                            ? '恭喜你贏了！🎉'
                            : '你輸了!!!!遊戲結束！💣'}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Board; 
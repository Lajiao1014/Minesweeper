import React, { useState } from 'react';
import Square from './Square';

interface BoardProps {
    rows: number;
    cols: number;
    mines: number;
}

type CellType = {
    isRevealed: boolean;
    hasMine: boolean;
    hasFlag: boolean;
    neighborMines: number;
};

type BoardType = CellType[][];

const Board = ({ rows, cols, mines }: BoardProps) => {
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


        let minesPlaced = 0;
        while (minesPlaced < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!newBoard[col][row].hasMine) {
                newBoard[col][row].hasMine = true;
                minesPlaced++;
            }
        }


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


    const handleClick = (row: number, col: number) => {

        if (board[col][row].isRevealed || board[col][row].hasFlag) return;

        const newBoard = [...board];


        if (board[col][row].hasMine) {

            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    if (newBoard[c][r].hasMine) {
                        newBoard[c][r].isRevealed = true;
                    }
                }
            }
            setBoard([...newBoard]);
            alert('Game Over!');
            return;
        }


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
            alert('Congratulations! You Win!');
        }
    };

    return (
        <div className="grid p-4 max-w-fit mx-auto border border-gray-300"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
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
    );
};

export default Board; 
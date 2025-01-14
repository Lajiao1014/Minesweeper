
'use client';

interface SquareProps {
    row: number;
    col: number;
    isRevealed: boolean;
    hasMine: boolean;
    hasFlag: boolean;
    neighborMines: number;
    onClick: (row: number, col: number) => void;
}

const Square = ({ row, col, isRevealed, hasMine, hasFlag, neighborMines, onClick }: SquareProps) => {
    return (
        <div
            className={`
                w-6 h-6 flex items-center justify-center
                ${isRevealed
                    ? 'bg-gray-300'
                    : 'bg-gray-200 border-2 border-gray-100 border-gray-600'}
                hover:bg-gray-40 cursor-pointer
                text-sm text-black
            `}
            onClick={() => onClick(row, col)}
        >
            {isRevealed ? (
                hasMine ? '💣' :
                    neighborMines > 0 ? neighborMines : ''
            ) : (
                hasFlag ? '🚩' : ''
            )}
        </div>
    );
};

export default Square; 
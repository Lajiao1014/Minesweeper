'use client';

interface HeaderProps {
    difficulty: string;
    time: number;
    minesLeft: number;
    isFlagging: boolean;
    onDifficultyChange: () => void;
    onMode: () => void;
    onReset: () => void;
}

const Header = ({
    difficulty,
    time,
    minesLeft,
    onDifficultyChange,
    onMode,
    onReset,
    isFlagging
}: HeaderProps) => {
    return (
        <div className="flex justify-between items-center w-full bg-gray-800 p-4 text-white">
            <button
                onClick={onDifficultyChange}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
                難度: {difficulty}
            </button>

            <button
                onClick={onMode}
                className={`px-4 py-2 rounded hover:bg-yellow-600 
                    ${isFlagging ? 'bg-red-500' : 'bg-yellow-500'}`}
            >
                地雷標記 🚩
            </button>

            <div className="px-4 py-2 bg-gray-700 rounded">
                時間: {time}秒
            </div>

            <div className="px-4 py-2 bg-gray-700 rounded">
                剩餘地雷: {minesLeft}
            </div>

            <button
                onClick={onReset}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
                重新開始
            </button>
        </div>
    );
}

export default Header;